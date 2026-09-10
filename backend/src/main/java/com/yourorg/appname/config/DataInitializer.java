package com.yourorg.appname.config;

import com.yourorg.appname.entity.*;
import com.yourorg.appname.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final LabReportRepository labReportRepository;
    private final AppointmentRepository appointmentRepository;
    private final MedicalInsightRepository medicalInsightRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           DoctorRepository doctorRepository,
                           LabReportRepository labReportRepository,
                           AppointmentRepository appointmentRepository,
                           MedicalInsightRepository medicalInsightRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.doctorRepository = doctorRepository;
        this.labReportRepository = labReportRepository;
        this.appointmentRepository = appointmentRepository;
        this.medicalInsightRepository = medicalInsightRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (departmentRepository.count() > 0) {
            log.info("Database already initialized with seed data. Skipping DataInitializer.");
            return;
        }

        log.info("Initializing sample hospital data for MediCare...");

        // 1. Users
        User admin = new User(null, "admin@medicare.com", passwordEncoder.encode("admin123"), "Dr. Sarah Jenkins", "(800) 555-0100", Role.ROLE_ADMIN, LocalDateTime.now());
        User patient = new User(null, "patient@medicare.com", passwordEncoder.encode("password123"), "Eleanor Vance", "(800) 555-0199", Role.ROLE_PATIENT, LocalDateTime.now());
        userRepository.save(admin);
        userRepository.save(patient);

        // 2. Departments
        Department cardio = new Department(null, "Heart & Vascular Institute", "CARDIO", "Comprehensive tertiary cardiac care, hybrid catheterization laboratories, and robotic heart surgery suites.", "cardiology", "Dr. Arthur Vance, MD, FACS", 120, "Floor 3", true, LocalDateTime.now());
        Department neuro = new Department(null, "Neurology & Neurosurgery", "NEURO", "Advanced brain and spine treatments, biplane neuro-interventional suites, and dedicated stroke ICUs.", "neurology", "Dr. Elena Rostova, MD, PhD", 85, "Floor 4", true, LocalDateTime.now());
        Department ortho = new Department(null, "Orthopedics & Spine Care", "ORTHO", "Minimally invasive joint preservation, robotic navigation surgery, and sports trauma rehabilitation.", "orthopedics", "Dr. Marcus Chen, MD, FAAP", 95, "Floor 2", true, LocalDateTime.now());
        Department onco = new Department(null, "Comprehensive Oncology", "ONCO", "Precision cancer therapies, immunotherapy programs, clinical trials, and linear accelerator radiation suites.", "oncology", "Dr. Julian Sterling, MD", 110, "Floor 5", true, LocalDateTime.now());
        Department pedia = new Department(null, "Pediatrics & Child Health", "PEDIA", "Dedicated pediatric emergency department, neonatal ICUs (NICU), and multidisciplinary pediatric specialists.", "pediatrics", "Dr. Marcus Chen, MD, FAAP", 70, "Floor 1", true, LocalDateTime.now());
        Department emergency = new Department(null, "Level 1 Emergency & Trauma", "EMERGENCY", "Round-the-clock rapid response trauma resuscitation, acute stroke protocols, and dedicated helipad.", "e911_emergency", "Dr. Robert Torres, MD", 60, "Ground Floor", true, LocalDateTime.now());

        cardio = departmentRepository.save(cardio);
        neuro = departmentRepository.save(neuro);
        ortho = departmentRepository.save(ortho);
        onco = departmentRepository.save(onco);
        pedia = departmentRepository.save(pedia);
        emergency = departmentRepository.save(emergency);

        // 3. Doctors
        Doctor drVance = new Doctor(null, "Dr. Arthur Vance, MD, FACS", "Chief of Cardiac Surgery", cardio, "MD, FACS - Johns Hopkins Medicine", 22, BigDecimal.valueOf(4.95), 342, new BigDecimal("220.00"), "https://lh3.googleusercontent.com/aida-public/AB6AXuBmoVsqMp6XiR8eMRmpQZmbAicOFc971TVGl24ErNgaa1K7OPCyxv8Y4Jsj6rrdTb-pRBoNSAe9QxPXsEVFDtZdEtXPZgY7aSWLX67__7fgc4oXQHKvWnnWpWlGOG0aQ9a_RePdvoEET1qWkTRj81F1lpQlxANT_Rp__uxEjKBc5m8Ttx7cbcixko3zXKy_W2CjrhrFn7TdLRbcXXg3wt75kRPhykN9GJ6cha484IqAGXOiLcos9HV1dg", "Pioneering minimally invasive coronary revascularization and robotic valve repair with over two decades of leading clinical excellence.", "Mon,Tue,Wed,Thu", LocalDateTime.now());
        Doctor drRostova = new Doctor(null, "Dr. Elena Rostova, MD, PhD", "Head of Neurosurgery", neuro, "MD, PhD - Harvard Medical School", 18, BigDecimal.valueOf(4.98), 289, new BigDecimal("250.00"), "https://lh3.googleusercontent.com/aida-public/AB6AXuA4LJPX8SDdxsKHpJWUnjK06l4g5wHBNwisIW_-gMvsEbXdL0ZfMu0vNnrGlTa2gizYZjw-2i2IIL0FaLwpZXgBVmaCeAzATFoNaVAsLgTeewUXv5c9G-iPRv0poZNksb0AnzkTvzPrrIG1ksXXQQX1rgea49BgIpfrMohQfVmjaHBQlyNmH4J7N11YeOpYf4Wv3j-s2q5fYU0cfWYyWS6OoVwmiLapc_Jhl5csehKByD5SR8TY0bjX0w", "Renowned for micro-neurosurgical skull base resection, complex cerebrovascular interventions, and robotic functional neurosurgery.", "Tue,Wed,Thu,Fri", LocalDateTime.now());
        Doctor drChen = new Doctor(null, "Dr. Marcus Chen, MD, FAAP", "Director of Pediatric Medicine", pedia, "MD, FAAP - Stanford University School of Medicine", 15, BigDecimal.valueOf(4.92), 198, new BigDecimal("180.00"), "https://lh3.googleusercontent.com/aida-public/AB6AXuBGcOCuYOmEozcWubKoGzcODnjCeMcNqaMcgFJ8lJUAuOh8uyglunGwxXbaPzWttMO748jMzjml5DVNw5Ji-_uUqgVBF194S-SFZqtUWRTPmC7HsJTU5tfpqkgklVIPSWpp3OAtBIZFZlJ4-Ok0k2BixW9bzHBJvyRuqBPzmjq4yCYFrbZxNQhgrNo8goB6MIGPmTQbCCYUo-s8cBVnihl98l9R04c3VoHSOI8a9n0aUCpp6NFISvtKXw", "Dedicated to compassionate pediatric critical care, congenital anomalies management, and developmental health monitoring.", "Mon,Wed,Fri,Sat", LocalDateTime.now());
        Doctor drSterling = new Doctor(null, "Dr. Julian Sterling, MD", "Senior Oncology Specialist", onco, "MD, Medical Oncology - Oxford University", 20, BigDecimal.valueOf(4.94), 215, new BigDecimal("240.00"), "https://lh3.googleusercontent.com/aida-public/AB6AXuBmoVsqMp6XiR8eMRmpQZmbAicOFc971TVGl24ErNgaa1K7OPCyxv8Y4Jsj6rrdTb-pRBoNSAe9QxPXsEVFDtZdEtXPZgY7aSWLX67__7fgc4oXQHKvWnnWpWlGOG0aQ9a_RePdvoEET1qWkTRj81F1lpQlxANT_Rp__uxEjKBc5m8Ttx7cbcixko3zXKy_W2CjrhrFn7TdLRbcXXg3wt75kRPhykN9GJ6cha484IqAGXOiLcos9HV1dg", "Specializing in targeted biological immunotherapies, personalized genomics-driven oncology, and comprehensive chemotherapy regimens.", "Mon,Tue,Thu,Fri", LocalDateTime.now());

        drVance = doctorRepository.save(drVance);
        drRostova = doctorRepository.save(drRostova);
        drChen = doctorRepository.save(drChen);
        drSterling = doctorRepository.save(drSterling);

        // 4. Medical Insights
        MedicalInsight insight1 = new MedicalInsight(null, "Heart Health in Modern Living: Silent Indicators You Shouldn't Ignore", "Cardiology", "A comprehensive review of early diagnostic markers in cardiovascular health and preventative strategies.", "Cardiovascular conditions often manifest subtle signals long before an acute event. From sleep architecture irregularities to microvascular exertion fatigue, understanding proactive heart metrics can safeguard long-term longevity.", "Dr. Arthur Vance, MD, FACS", "Chief of Cardiac Surgery", 6, LocalDate.of(2026, 8, 15), "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", LocalDateTime.now());
        MedicalInsight insight2 = new MedicalInsight(null, "Breakthroughs in Minimally Invasive Orthopedic Joint Procedures", "Orthopedics", "How computerized robotic navigation reduces recovery times by up to 60% in joint replacements.", "Modern orthopedic intervention prioritizes muscle-sparing approaches, custom implant 3D modeling, and accelerated early ambulation protocols to restore pain-free biomechanical mobility.", "Dr. Marcus Chen, MD, FAAP", "Orthopedics & Spine Director", 5, LocalDate.of(2026, 8, 28), "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", LocalDateTime.now());
        MedicalInsight insight3 = new MedicalInsight(null, "Pediatric Immunization & Seasonal Wellness: A Parent's Complete Guide", "Pediatrics", "Essential schedule recommendations, seasonal vaccine guidance, and childhood immune optimization.", "Navigating children's vaccination milestones and building robust mucosal immunity during transition seasons with evidence-backed clinical protocols.", "Dr. Sarah Jenkins", "Clinical Chief Officer", 7, LocalDate.of(2026, 9, 2), "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", LocalDateTime.now());

        medicalInsightRepository.save(insight1);
        medicalInsightRepository.save(insight2);
        medicalInsightRepository.save(insight3);

        // 5. Demo Lab Reports for Eleanor Vance
        LabReport report1 = new LabReport(null, patient, "Comprehensive Metabolic Panel (CMP-14)", "Biochemistry", LocalDate.of(2026, 8, 20), "Dr. Arthur Vance, MD, FACS", ReportStatus.READY, "All electrolyte, renal, and liver markers within optimal reference thresholds. Fasting glucose at 88 mg/dL.", "https://medicare.org/reports/cmp-14-eleanor.pdf", LocalDateTime.now());
        LabReport report2 = new LabReport(null, patient, "Advanced Lipid & ApoB Profile", "Cardiology", LocalDate.of(2026, 8, 22), "Dr. Arthur Vance, MD, FACS", ReportStatus.READY, "Total cholesterol: 172 mg/dL. HDL: 62 mg/dL. LDL: 94 mg/dL. ApoB: 72 mg/dL. Optimal cardiovascular risk score.", "https://medicare.org/reports/lipid-apob-eleanor.pdf", LocalDateTime.now());
        LabReport report3 = new LabReport(null, patient, "Contrast MRI Brain & Cervical Spine", "Radiology & Imaging", LocalDate.of(2026, 9, 1), "Dr. Elena Rostova, MD, PhD", ReportStatus.READY, "Clear scan. No acute intracranial hemorrhage, mass effect, or demyelinating lesions noted.", "https://medicare.org/reports/mri-brain-eleanor.pdf", LocalDateTime.now());

        labReportRepository.save(report1);
        labReportRepository.save(report2);
        labReportRepository.save(report3);

        // 6. Demo Appointments
        Appointment appt1 = new Appointment(null, "Eleanor Vance", "patient@medicare.com", "(800) 555-0199", patient, drVance, cardio, LocalDate.of(2026, 9, 18), "10:30 AM", ConsultationType.IN_PERSON, AppointmentStatus.CONFIRMED, "Quarterly preventative cardiovascular checkup and ECG review.", LocalDateTime.now());
        appointmentRepository.save(appt1);

        log.info("MediCare Hospital initial data successfully loaded!");
    }
}
