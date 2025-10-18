import fs from 'fs';
import { chromium } from 'playwright';

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }

        body {
            font-family: 'Courier New', monospace;
            font-size: 10pt;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 20px;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .hospital-name {
            font-size: 16pt;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .contact-info {
            font-size: 9pt;
            margin-top: 5px;
        }

        .section-title {
            background-color: #f0f0f0;
            border: 1px solid #000;
            padding: 8px;
            font-weight: bold;
            font-size: 11pt;
            text-align: center;
            margin-top: 15px;
            margin-bottom: 10px;
        }

        .patient-info {
            margin: 15px 0;
            font-size: 10pt;
        }

        .info-row {
            margin: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }

        th {
            background-color: #e0e0e0;
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
            font-size: 9pt;
            font-weight: bold;
        }

        td {
            border: 1px solid #000;
            padding: 6px;
            font-size: 9pt;
        }

        .abnormal {
            font-weight: bold;
            color: #d00;
        }

        .remarks {
            margin: 15px 0;
            padding: 10px;
            border: 1px solid #000;
            background-color: #fffacd;
        }

        .remarks-title {
            font-weight: bold;
            font-size: 11pt;
            margin-bottom: 8px;
        }

        .remarks-item {
            margin: 4px 0 4px 20px;
        }

        .footer {
            border-top: 2px solid #000;
            margin-top: 20px;
            padding-top: 10px;
            text-align: center;
            font-size: 9pt;
        }

        .divider {
            border-top: 1px dashed #000;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="hospital-name">CITY HOSPITAL LABORATORY</div>
        <div class="contact-info">123 Medical Center, Karachi</div>
        <div class="contact-info">Tel: +92-21-1234567 | Lab@cityhospital.pk</div>
    </div>

    <div style="text-align: center; font-size: 14pt; font-weight: bold; margin: 15px 0;">
        PATIENT LABORATORY REPORT
    </div>

    <div class="patient-info">
        <div class="info-row"><strong>Name:</strong> Muhammad Ahmed Khan</div>
        <div class="info-row"><strong>Age:</strong> 35 Years &nbsp;&nbsp;&nbsp; <strong>Gender:</strong> Male</div>
        <div class="info-row"><strong>Patient ID:</strong> CH-2025-001234</div>
        <div class="info-row"><strong>Date of Collection:</strong> January 15, 2025 &nbsp;&nbsp;&nbsp; <strong>Date of Report:</strong> January 16, 2025</div>
        <div class="info-row"><strong>Referring Physician:</strong> Dr. Sarah Malik</div>
    </div>

    <div class="section-title">COMPLETE BLOOD COUNT (CBC)</div>
    <table>
        <thead>
            <tr>
                <th>TEST NAME</th>
                <th>RESULT</th>
                <th>NORMAL RANGE</th>
                <th>UNIT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Hemoglobin</td>
                <td>13.2</td>
                <td>13.5-17.5</td>
                <td>g/dL</td>
            </tr>
            <tr>
                <td>Total WBC Count</td>
                <td class="abnormal">11.5 (H)</td>
                <td>4.0-11.0</td>
                <td>x10³/uL</td>
            </tr>
            <tr>
                <td>RBC Count</td>
                <td>4.8</td>
                <td>4.5-5.5</td>
                <td>x10⁶/uL</td>
            </tr>
            <tr>
                <td>Hematocrit</td>
                <td>41.2</td>
                <td>40-50</td>
                <td>%</td>
            </tr>
            <tr>
                <td>MCV</td>
                <td>85.8</td>
                <td>80-100</td>
                <td>fL</td>
            </tr>
            <tr>
                <td>MCH</td>
                <td>27.5</td>
                <td>27-32</td>
                <td>pg</td>
            </tr>
            <tr>
                <td>MCHC</td>
                <td>32.1</td>
                <td>32-36</td>
                <td>g/dL</td>
            </tr>
            <tr>
                <td>Platelet Count</td>
                <td>245</td>
                <td>150-400</td>
                <td>x10³/uL</td>
            </tr>
            <tr>
                <td>Neutrophils</td>
                <td>68</td>
                <td>40-75</td>
                <td>%</td>
            </tr>
            <tr>
                <td>Lymphocytes</td>
                <td>25</td>
                <td>20-45</td>
                <td>%</td>
            </tr>
            <tr>
                <td>Monocytes</td>
                <td>5</td>
                <td>2-10</td>
                <td>%</td>
            </tr>
            <tr>
                <td>Eosinophils</td>
                <td>2</td>
                <td>1-6</td>
                <td>%</td>
            </tr>
            <tr>
                <td>Basophils</td>
                <td>0</td>
                <td>0-1</td>
                <td>%</td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">LIPID PROFILE</div>
    <table>
        <thead>
            <tr>
                <th>TEST NAME</th>
                <th>RESULT</th>
                <th>NORMAL RANGE</th>
                <th>UNIT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Cholesterol</td>
                <td class="abnormal">220 (H)</td>
                <td>&lt;200</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Triglycerides</td>
                <td>165</td>
                <td>&lt;150</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>HDL Cholesterol</td>
                <td class="abnormal">42 (L)</td>
                <td>&gt;40</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>LDL Cholesterol</td>
                <td class="abnormal">145 (H)</td>
                <td>&lt;100</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>VLDL Cholesterol</td>
                <td>33</td>
                <td>&lt;30</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Cholesterol/HDL Ratio</td>
                <td class="abnormal">5.2 (H)</td>
                <td>&lt;4.5</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">LIVER FUNCTION TEST</div>
    <table>
        <thead>
            <tr>
                <th>TEST NAME</th>
                <th>RESULT</th>
                <th>NORMAL RANGE</th>
                <th>UNIT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Bilirubin</td>
                <td>0.9</td>
                <td>0.3-1.2</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Direct Bilirubin</td>
                <td>0.3</td>
                <td>0.1-0.3</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Indirect Bilirubin</td>
                <td>0.6</td>
                <td>0.2-0.9</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>SGPT (ALT)</td>
                <td class="abnormal">45 (H)</td>
                <td>7-40</td>
                <td>U/L</td>
            </tr>
            <tr>
                <td>SGOT (AST)</td>
                <td>38</td>
                <td>10-40</td>
                <td>U/L</td>
            </tr>
            <tr>
                <td>Alkaline Phosphatase</td>
                <td>95</td>
                <td>44-147</td>
                <td>U/L</td>
            </tr>
            <tr>
                <td>Total Protein</td>
                <td>7.2</td>
                <td>6.0-8.0</td>
                <td>g/dL</td>
            </tr>
            <tr>
                <td>Albumin</td>
                <td>4.1</td>
                <td>3.5-5.5</td>
                <td>g/dL</td>
            </tr>
            <tr>
                <td>Globulin</td>
                <td>3.1</td>
                <td>2.0-3.5</td>
                <td>g/dL</td>
            </tr>
            <tr>
                <td>A/G Ratio</td>
                <td>1.32</td>
                <td>1.0-2.0</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">KIDNEY FUNCTION TEST</div>
    <table>
        <thead>
            <tr>
                <th>TEST NAME</th>
                <th>RESULT</th>
                <th>NORMAL RANGE</th>
                <th>UNIT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Blood Urea Nitrogen</td>
                <td>15</td>
                <td>7-20</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Creatinine</td>
                <td>1.0</td>
                <td>0.7-1.3</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Uric Acid</td>
                <td>6.2</td>
                <td>3.5-7.2</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>Sodium (Na⁺)</td>
                <td>140</td>
                <td>136-145</td>
                <td>mmol/L</td>
            </tr>
            <tr>
                <td>Potassium (K⁺)</td>
                <td>4.2</td>
                <td>3.5-5.1</td>
                <td>mmol/L</td>
            </tr>
            <tr>
                <td>Chloride (Cl⁻)</td>
                <td>102</td>
                <td>98-107</td>
                <td>mmol/L</td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">BLOOD GLUCOSE TEST</div>
    <table>
        <thead>
            <tr>
                <th>TEST NAME</th>
                <th>RESULT</th>
                <th>NORMAL RANGE</th>
                <th>UNIT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Fasting Blood Sugar</td>
                <td class="abnormal">118 (H)</td>
                <td>70-100</td>
                <td>mg/dL</td>
            </tr>
            <tr>
                <td>HbA1c</td>
                <td class="abnormal">6.2 (H)</td>
                <td>&lt;5.7</td>
                <td>%</td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">THYROID FUNCTION TEST</div>
    <table>
        <thead>
            <tr>
                <th>TEST NAME</th>
                <th>RESULT</th>
                <th>NORMAL RANGE</th>
                <th>UNIT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>TSH</td>
                <td>3.8</td>
                <td>0.4-4.0</td>
                <td>mIU/L</td>
            </tr>
            <tr>
                <td>Free T3</td>
                <td>3.2</td>
                <td>2.0-4.4</td>
                <td>pg/mL</td>
            </tr>
            <tr>
                <td>Free T4</td>
                <td>1.3</td>
                <td>0.9-1.7</td>
                <td>ng/dL</td>
            </tr>
        </tbody>
    </table>

    <div class="remarks">
        <div class="remarks-title">REMARKS:</div>
        <div class="remarks-item">1. Elevated WBC count - may indicate infection or inflammation</div>
        <div class="remarks-item">2. Lipid profile shows elevated total cholesterol and LDL</div>
        <div class="remarks-item">3. Low HDL cholesterol - cardiovascular risk factor</div>
        <div class="remarks-item">4. Slightly elevated SGPT - monitor liver function</div>
        <div class="remarks-item">5. Fasting blood sugar indicates prediabetic range</div>
        <div class="remarks-item">6. HbA1c suggests impaired glucose tolerance</div>
    </div>

    <div class="remarks">
        <div class="remarks-title">RECOMMENDATIONS:</div>
        <div class="remarks-item">1. Dietary modifications - reduce saturated fats and refined sugars</div>
        <div class="remarks-item">2. Regular exercise - at least 30 minutes daily</div>
        <div class="remarks-item">3. Repeat lipid profile and glucose tests after 3 months</div>
        <div class="remarks-item">4. Consider diabetes screening</div>
        <div class="remarks-item">5. Follow up with physician for detailed evaluation</div>
    </div>

    <div class="footer">
        <div style="margin: 10px 0;">
            <strong>Laboratory Director:</strong> Dr. Imran Hassan, FCPS (Pathology)<br>
            <strong>Digital Signature:</strong> Verified
        </div>
        <div style="margin: 10px 0;">
            <strong>Report Generated:</strong> January 16, 2025 10:30 AM<br>
            <strong>Authentication Code:</strong> CH-LAB-2025-001234-VERIFIED
        </div>
        <div class="divider"></div>
        <div style="font-size: 8pt; margin-top: 10px;">
            This is a computer generated report<br>
            For queries contact: lab@cityhospital.pk | +92-21-1234567
        </div>
    </div>
</body>
</html>
`;

async function generatePDF() {
    console.log('🚀 Starting PDF generation...');

    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        await page.pdf({
            path: 'dummy-lab-report.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            }
        });

        await browser.close();

        console.log('✅ PDF generated successfully: dummy-lab-report.pdf');
    } catch (error) {
        console.error('❌ Error generating PDF:', error.message);
        process.exit(1);
    }
}

generatePDF();
