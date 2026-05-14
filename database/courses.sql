INSERT INTO courses
(dept_id, course_name, course_description, duration, fee, eligibility, intake_capacity, admission_start_date, admission_end_date, status)
VALUES

/* =========================
   Department 1: Computer Science
   ========================= */
(1,'BSc Computer Science','Undergraduate computer science program','3 Years',45000,'Plus Two with Mathematics',60,'2026-06-01','2026-08-31','active'),
(1,'MSc Computer Science','Postgraduate CS specialization','2 Years',65000,'BSc Computer Science',40,'2026-06-01','2026-08-31','active'),
(1,'BCA','Bachelor of Computer Applications','3 Years',40000,'Plus Two',60,'2026-06-01','2026-08-31','active'),
(1,'MCA','Master of Computer Applications','2 Years',70000,'BCA/BSc CS',40,'2026-06-01','2026-08-31','active'),
(1,'Diploma in Programming','Programming fundamentals','1 Year',25000,'10th Pass',50,'2026-06-01','2026-08-31','active'),
(1,'Certificate in Web Development','Frontend and backend basics','6 Months',15000,'Plus Two',40,'2026-06-01','2026-08-31','active'),
(1,'Certificate in AI','Artificial Intelligence basics','6 Months',18000,'Plus Two',35,'2026-06-01','2026-08-31','active'),
(1,'Certificate in ML','Machine Learning basics','6 Months',18000,'Plus Two',35,'2026-06-01','2026-08-31','active'),
(1,'Data Science Basics','Data science foundation','1 Year',30000,'Plus Two',40,'2026-06-01','2026-08-31','active'),
(1,'Cyber Security Fundamentals','Security principles','1 Year',35000,'Plus Two',40,'2026-06-01','2026-08-31','active'),
(1,'Cloud Computing','Cloud infrastructure basics','1 Year',32000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(1,'Mobile App Development','Android and iOS basics','1 Year',30000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(1,'Blockchain Technology','Blockchain fundamentals','6 Months',25000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(1,'Game Development','Game engine programming','1 Year',35000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(1,'Software Testing','Testing methodologies','6 Months',15000,'Plus Two',40,'2026-06-01','2026-08-31','active'),
(1,'Database Administration','DBMS concepts and admin','1 Year',28000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(1,'DevOps Engineering','CI/CD and deployment','1 Year',35000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(1,'Big Data Analytics','Big data tools','1 Year',36000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(1,'IoT Programming','Internet of Things development','1 Year',30000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(1,'UI UX Design','User interface design','6 Months',18000,'Plus Two',35,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 2: Electronics
   ========================= */
(2,'BTech Electronics','Core electronics engineering','4 Years',85000,'Plus Two Science',60,'2026-06-01','2026-08-31','active'),
(2,'MTech Electronics','Advanced electronics','2 Years',95000,'BTech Electronics',30,'2026-06-01','2026-08-31','active'),
(2,'Embedded Systems','Embedded hardware design','1 Year',40000,'Diploma/BTech',30,'2026-06-01','2026-08-31','active'),
(2,'VLSI Design','Chip design basics','1 Year',45000,'BTech',20,'2026-06-01','2026-08-31','active'),
(2,'Robotics','Robotics fundamentals','1 Year',50000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Industrial Automation','Automation systems','1 Year',42000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'PCB Design','Circuit board designing','6 Months',20000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(2,'Signal Processing','Signal analysis','1 Year',38000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Microcontrollers','Microcontroller programming','6 Months',22000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Wireless Communication','Communication systems','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Digital Electronics','Digital systems basics','1 Year',30000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(2,'Analog Electronics','Analog circuit basics','1 Year',30000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(2,'IoT Electronics','IoT hardware systems','1 Year',32000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(2,'Sensor Technology','Sensors and applications','6 Months',20000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(2,'Power Electronics','Power devices and circuits','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Control Systems','Automation control theory','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Communication Networks','Network communication','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'Semiconductor Devices','Semiconductor basics','6 Months',22000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(2,'Instrumentation','Measurement systems','1 Year',30000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(2,'RF Engineering','Radio frequency systems','1 Year',38000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),

/* Department 3 to 10 (20 each = 160 more rows) */
/* Mechanical Engineering */
(3,'BTech Mechanical Engineering','Mechanical core engineering','4 Years',85000,'Plus Two Science',60,'2026-06-01','2026-08-31','active'),
(3,'MTech Mechanical Engineering','Advanced mechanical studies','2 Years',95000,'BTech Mechanical',30,'2026-06-01','2026-08-31','active'),
(3,'Thermal Engineering','Heat and thermodynamics','1 Year',40000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'Automobile Engineering','Vehicle systems','1 Year',42000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(3,'Production Engineering','Manufacturing systems','1 Year',40000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),

/* Civil Engineering */
(4,'BTech Civil Engineering','Civil construction engineering','4 Years',85000,'Plus Two Science',60,'2026-06-01','2026-08-31','active'),
(4,'MTech Structural Engineering','Advanced structural design','2 Years',95000,'BTech Civil',30,'2026-06-01','2026-08-31','active'),
(4,'Construction Management','Construction planning','1 Year',42000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(4,'Surveying','Land surveying methods','6 Months',20000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(4,'Environmental Engineering','Environmental systems','1 Year',38000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),

/* Electrical Engineering */
(5,'BTech Electrical Engineering','Electrical engineering fundamentals','4 Years',85000,'Plus Two Science',60,'2026-06-01','2026-08-31','active'),
(5,'MTech Power Systems','Advanced power systems','2 Years',95000,'BTech Electrical',30,'2026-06-01','2026-08-31','active'),
(5,'Renewable Energy','Solar and wind systems','1 Year',40000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(5,'Electrical Machines','Motors and generators','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(5,'Power Distribution','Power grid systems','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),

/* Business Administration */
(6,'BBA','Bachelor of Business Administration','3 Years',50000,'Plus Two',60,'2026-06-01','2026-08-31','active'),
(6,'MBA Finance','Finance specialization','2 Years',90000,'Graduate',40,'2026-06-01','2026-08-31','active'),
(6,'MBA Marketing','Marketing specialization','2 Years',90000,'Graduate',40,'2026-06-01','2026-08-31','active'),
(6,'MBA HR','Human resource specialization','2 Years',90000,'Graduate',40,'2026-06-01','2026-08-31','active'),
(6,'Business Analytics','Business intelligence','1 Year',45000,'Graduate',30,'2026-06-01','2026-08-31','active'),

/* Commerce */
(7,'BCom Finance','Finance and accounting','3 Years',35000,'Plus Two Commerce',60,'2026-06-01','2026-08-31','active'),
(7,'MCom Finance','Advanced commerce studies','2 Years',45000,'BCom',30,'2026-06-01','2026-08-31','active'),
(7,'Taxation','Tax laws and systems','1 Year',25000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(7,'Banking','Banking operations','1 Year',28000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(7,'Accounting','Financial accounting','1 Year',25000,'Plus Two',30,'2026-06-01','2026-08-31','active'),

/* Mathematics */
(8,'BSc Mathematics','Mathematics degree','3 Years',30000,'Plus Two Science',50,'2026-06-01','2026-08-31','active'),
(8,'MSc Mathematics','Advanced mathematics','2 Years',40000,'BSc Mathematics',25,'2026-06-01','2026-08-31','active'),
(8,'Applied Mathematics','Mathematical applications','1 Year',28000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(8,'Statistics','Statistical methods','1 Year',28000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(8,'Operations Research','Optimization techniques','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),

/* Physics */
(9,'BSc Physics','Physics degree','3 Years',30000,'Plus Two Science',50,'2026-06-01','2026-08-31','active'),
(9,'MSc Physics','Advanced physics','2 Years',40000,'BSc Physics',25,'2026-06-01','2026-08-31','active'),
(9,'Quantum Physics','Quantum mechanics basics','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Astrophysics','Space science','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Nuclear Physics','Atomic science','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),

/* English */
(10,'BA English','English literature degree','3 Years',28000,'Plus Two',60,'2026-06-01','2026-08-31','active'),
(10,'MA English','Advanced literature studies','2 Years',38000,'BA English',30,'2026-06-01','2026-08-31','active'),
(10,'Creative Writing','Writing techniques','1 Year',22000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(10,'Journalism','Media and communication','1 Year',25000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(10,'Linguistics','Language studies','1 Year',25000,'Plus Two',30,'2026-06-01','2026-08-31','active');


INSERT INTO courses
(dept_id, course_name, course_description, duration, fee, eligibility, intake_capacity, admission_start_date, admission_end_date, status)
VALUES

/* =========================
   Department 3: Mechanical Engineering (15 more)
   ========================= */
(3,'Industrial Design Engineering','Product and industrial design','1 Year',42000,'Plus Two Science',30,'2026-06-01','2026-08-31','active'),
(3,'Manufacturing Technology','Modern manufacturing systems','1 Year',39000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'CAD CAM Engineering','Computer-aided design and manufacturing','1 Year',36000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'Fluid Mechanics','Flow mechanics and applications','1 Year',34000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Machine Design','Design of machines','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Welding Technology','Industrial welding practices','6 Months',18000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'Tool Engineering','Tool design and manufacturing','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Industrial Safety Engineering','Workplace safety systems','1 Year',30000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'HVAC Technology','Heating ventilation and AC systems','1 Year',32000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'Marine Engineering Basics','Ship engineering fundamentals','1 Year',42000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Mechatronics Engineering','Mechanical and electronics integration','1 Year',40000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Precision Engineering','High precision manufacturing','1 Year',36000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Industrial Robotics','Robotics in manufacturing','1 Year',42000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(3,'Piping Engineering','Industrial piping systems','1 Year',30000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(3,'Plant Engineering','Industrial plant systems','1 Year',34000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 4: Civil Engineering (15 more)
   ========================= */
(4,'Transportation Engineering','Road and transport systems','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(4,'Geotechnical Engineering','Soil and foundation engineering','1 Year',35000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(4,'Hydraulic Engineering','Water resource systems','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Urban Planning','City planning and development','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Bridge Engineering','Bridge design and analysis','1 Year',38000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Concrete Technology','Concrete materials and applications','6 Months',18000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(4,'Road Safety Engineering','Road design safety','6 Months',18000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(4,'Smart City Infrastructure','Modern urban infrastructure','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Water Resource Management','Water systems planning','1 Year',30000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Earthquake Engineering','Seismic design principles','1 Year',38000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Tunnel Engineering','Tunnel construction systems','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Building Design','Architectural construction basics','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Construction Materials','Modern building materials','6 Months',18000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(4,'Land Development Engineering','Land development systems','1 Year',30000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(4,'Smart Construction Technology','Digital construction methods','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 5: Electrical Engineering (15 more)
   ========================= */
(5,'High Voltage Engineering','High voltage systems','1 Year',38000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Smart Grid Technology','Modern electric grids','1 Year',40000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Electrical Wiring Systems','Domestic and industrial wiring','6 Months',18000,'Plus Two Science',25,'2026-06-01','2026-08-31','active'),
(5,'Industrial Drives','Motor drive systems','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Battery Technology','Energy storage systems','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Electric Vehicle Systems','EV technology and systems','1 Year',42000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Power Plant Engineering','Power generation systems','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Energy Management Systems','Energy efficiency systems','1 Year',30000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Industrial Electrical Systems','Factory electrical systems','1 Year',30000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Transformer Technology','Transformer systems','6 Months',18000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Electrical Protection Systems','Circuit protection systems','1 Year',32000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Solar Power Systems','Solar energy applications','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Wind Energy Systems','Wind turbine systems','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Substation Engineering','Electrical substations','1 Year',35000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(5,'Electrical Control Panels','Panel design systems','6 Months',18000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 6: Business Administration (15 more)
   ========================= */
(6,'Entrepreneurship Development','Startup and business creation','1 Year',30000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(6,'Retail Management','Retail business operations','1 Year',28000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(6,'Digital Marketing','Online marketing systems','1 Year',32000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(6,'Supply Chain Management','Supply chain systems','1 Year',35000,'Graduate',25,'2026-06-01','2026-08-31','active'),
(6,'International Business','Global business operations','1 Year',38000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(6,'Project Management','Project planning and execution','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(6,'Business Communication','Corporate communication skills','6 Months',15000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(6,'Customer Relationship Management','CRM fundamentals','6 Months',15000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(6,'Strategic Management','Business strategy planning','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(6,'Financial Planning','Corporate finance planning','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(6,'Business Law','Legal business systems','1 Year',28000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(6,'Leadership Management','Leadership and team building','6 Months',18000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(6,'Organizational Behaviour','Human behavior in business','1 Year',28000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(6,'E Commerce Management','Online business systems','1 Year',32000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(6,'Corporate Governance','Corporate compliance systems','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 7: Commerce (15 more)
   ========================= */
(7,'Financial Accounting Advanced','Advanced accounting systems','1 Year',28000,'Plus Two Commerce',30,'2026-06-01','2026-08-31','active'),
(7,'Cost Accounting','Cost management systems','1 Year',25000,'Plus Two Commerce',30,'2026-06-01','2026-08-31','active'),
(7,'Auditing','Audit principles and systems','1 Year',25000,'Plus Two Commerce',25,'2026-06-01','2026-08-31','active'),
(7,'Business Taxation','Tax systems and compliance','1 Year',28000,'Plus Two Commerce',25,'2026-06-01','2026-08-31','active'),
(7,'Financial Management Commerce','Financial decision making','1 Year',28000,'Plus Two Commerce',25,'2026-06-01','2026-08-31','active'),
(7,'Investment Management','Investment planning systems','1 Year',30000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Corporate Accounting','Corporate accounting systems','1 Year',28000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Insurance Management','Insurance operations','1 Year',25000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Financial Services','Banking and financial services','1 Year',28000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Stock Market Analysis','Stock market systems','6 Months',18000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Export Import Management','Trade systems','1 Year',30000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Corporate Finance Commerce','Corporate finance systems','1 Year',30000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'GST Management','GST tax systems','6 Months',15000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Accounting Information Systems','Accounting software systems','1 Year',28000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),
(7,'Business Economics Commerce','Business economic analysis','1 Year',28000,'Plus Two Commerce',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 8: Mathematics (15 more)
   ========================= */
(8,'Pure Mathematics','Advanced pure mathematics','1 Year',28000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(8,'Numerical Analysis','Numerical computing methods','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Linear Algebra','Matrix systems and vectors','1 Year',25000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(8,'Discrete Mathematics','Mathematical logic systems','1 Year',25000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(8,'Probability Theory','Probability systems','1 Year',25000,'Plus Two Science',20,'2026-06-01','2026-08-31','active'),
(8,'Mathematical Modeling','Real-world mathematical models','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Advanced Statistics','Statistical modeling systems','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Topology Basics','Topology fundamentals','1 Year',28000,'Graduate',15,'2026-06-01','2026-08-31','active'),
(8,'Algebraic Structures','Abstract algebra systems','1 Year',28000,'Graduate',15,'2026-06-01','2026-08-31','active'),
(8,'Differential Equations','Equation solving systems','1 Year',28000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Mathematical Finance','Finance with mathematics','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Graph Theory','Graph systems and algorithms','1 Year',28000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Computational Mathematics','Mathematics with computing','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Optimization Theory','Optimization systems','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(8,'Mathematical Logic','Formal logic systems','1 Year',28000,'Graduate',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 9: Physics (15 more)
   ========================= */
(9,'Solid State Physics','Solid materials physics','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Particle Physics','Subatomic particle systems','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Optics and Photonics','Light systems and optics','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Thermodynamics Physics','Heat systems in physics','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Electromagnetism','Magnetic and electric systems','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Condensed Matter Physics','Matter systems','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Laser Technology','Laser systems and applications','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Space Physics','Space environment physics','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Radiation Physics','Radiation systems','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Biophysics','Biological systems physics','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Computational Physics','Simulation and computational systems','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Plasma Physics','Plasma systems','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Material Physics','Material science systems','1 Year',32000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Experimental Physics','Physics lab systems','1 Year',30000,'Graduate',20,'2026-06-01','2026-08-31','active'),
(9,'Theoretical Physics','Theory and models in physics','1 Year',35000,'Graduate',20,'2026-06-01','2026-08-31','active'),

/* =========================
   Department 10: English (15 more)
   ========================= */
(10,'English Literature Studies','Study of literature','1 Year',25000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(10,'Modern Poetry','Poetry analysis and writing','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Drama and Theatre','Theatre arts and drama','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Technical Writing','Professional technical writing','6 Months',15000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(10,'Content Writing','Digital content creation','6 Months',15000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(10,'Spoken English Advanced','Advanced spoken English','6 Months',12000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(10,'English Grammar Mastery','Grammar systems and usage','6 Months',12000,'Plus Two',30,'2026-06-01','2026-08-31','active'),
(10,'Public Speaking','Speech and presentation skills','6 Months',15000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(10,'Media Writing','Writing for media platforms','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Translation Studies','Language translation systems','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Academic Writing','Research and academic writing','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Literary Criticism','Critical analysis of literature','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Comparative Literature','Comparison of literature systems','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active'),
(10,'Communication Skills','Professional communication skills','6 Months',15000,'Plus Two',25,'2026-06-01','2026-08-31','active'),
(10,'Publishing Studies','Publishing and editing systems','1 Year',22000,'Plus Two',20,'2026-06-01','2026-08-31','active');