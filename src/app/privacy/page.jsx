'use client'

import styled from '@emotion/styled'

const PrivacyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;
  
  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-family: var(--font-baloo2);
    margin-bottom: 2rem;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-family: var(--font-baloo2);
    margin: 2rem 0 1rem;
  }

  p {
    font-family: var(--font-poppins);
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    li {
      font-family: var(--font-poppins);
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.8;
    }
  }
`

export default function Privacy() {
  return (
    <PrivacyContainer>
      <h1>Privacy Policy</h1>

      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us, including:</p>
      <ul>
        <li>Name and contact information</li>
        <li>Business details</li>
        <li>Project requirements</li>
        <li>Communication preferences</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Deliver our services and maintain our business relationship</li>
        <li>Communicate about projects and services</li>
        <li>Improve our services and user experience</li>
        <li>Send relevant updates and marketing communications</li>
      </ul>

      <h2>3. Information Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

      <h2>4. Data Retention</h2>
      <p>We retain your information for as long as necessary to provide our services and maintain business records, or as required by applicable laws.</p>

      <h2>5. Third-Party Services</h2>
      <p>We may use trusted third-party services for business operations. These services have their own privacy policies and data processing agreements.</p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Request corrections to your data</li>
        <li>Request deletion of your information</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2>7. Updates to Privacy Policy</h2>
      <p>We may update this privacy policy periodically. Significant changes will be communicated through our website or direct notification.</p>

      <h2>8. Contact Us</h2>
      <p>For privacy-related inquiries, please contact us at support@pinova.in</p>
    </PrivacyContainer>
  )
}
