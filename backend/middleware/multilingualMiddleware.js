const { detectLanguage } = require("../services/languageDetectionService");
const { translateToEnglish, translateFromEnglish } = require("../services/translationService");

/**
 * Middleware to handle multilingual chat flow.
 * 1. Detect language (if not provided)
 * 2. Translate user message to English
 * 3. Intercept response and translate back to user language
 */
async function multilingualMiddleware(req, res, next) {
  const isPost = req.method === "POST";
  const rawMessage = isPost ? req.body?.message : req.query?.q;
  
  if (!rawMessage) {
    return next();
  }

  try {
    const originalMessage = rawMessage;
    const clientLang = (isPost ? req.body?.language : req.query?.language) || "en";
    const detectedLang = detectLanguage(originalMessage, clientLang);
    
    // Store detected lang for response translation
    req.detectedLang = detectedLang;

    // Translate to English if not already English
    if (detectedLang !== "en") {
      const translated = await translateToEnglish(originalMessage, detectedLang);
      if (isPost) {
        req.body.originalMessage = originalMessage;
        req.body.message = translated;
      } else {
        req.query.originalQ = originalMessage;
        req.query.q = translated;
      }
      console.log(`[Multilingual] Translated "${originalMessage}" (${detectedLang}) -> "${translated}" (en)`);
    }

    // Intercept res.json to translate response fields
    const originalJson = res.json;
    res.json = async function (data) {
      if (req.detectedLang && req.detectedLang !== "en" && data) {
        try {
          // Translate reply
          if (data.reply) {
            data.originalReply = data.reply;
            data.reply = await translateFromEnglish(data.reply, req.detectedLang);
          }
          
          // Translate suggestions
          if (Array.isArray(data.suggestions)) {
            data.originalSuggestions = [...data.suggestions];
            data.suggestions = await Promise.all(
              data.suggestions.map(s => translateFromEnglish(s, req.detectedLang))
            );
          }
          
          data.language = req.detectedLang;
          console.log(`[Multilingual] Translated response back to ${req.detectedLang}`);
        } catch (err) {
          console.error("[Multilingual] Response translation failed:", err);
        }
      }
      return originalJson.call(this, data);
    };

    next();
  } catch (err) {
    console.error("[Multilingual] Middleware error:", err);
    next();
  }
}

module.exports = multilingualMiddleware;
