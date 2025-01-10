'use client'

import styled from '@emotion/styled'

const TermsContainer = styled.div`
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
`

export default function Terms() {
  return (
    <TermsContainer>
      <h1>Terms of Service</h1>
      
      <h2>1. Services Overview</h2>
      <p>Pinova Agency provides digital product development, design, and strategy services. Our deliverables may include but are not limited to web applications, mobile applications, design assets, and consulting services.</p>

      <h2>2. Project Engagement</h2>
      <p>All projects begin with a formal agreement outlining scope, deliverables, timeline, and payment terms. Changes to project scope must be agreed upon in writing by both parties.</p>

      <h2>3. Intellectual Property Rights</h2>
      <p>Upon full payment, clients receive full intellectual property rights to the final deliverables. Pinova Agency retains rights to showcase the work in our portfolio and case studies unless explicitly agreed otherwise.</p>

      <h2>4. Payment Terms</h2>
      <p>We typically require a 50% upfront deposit to commence work, with remaining payments scheduled at project milestones. All invoices are payable within 14 days of receipt.</p>

      <h2>5. Project Timeline</h2>
      <p>While we strive to meet all deadlines, timelines may be adjusted due to client feedback delays, scope changes, or other unforeseen circumstances. We'll communicate any timeline changes promptly.</p>

      <h2>6. Confidentiality</h2>
      <p>We maintain strict confidentiality regarding all client information and project details. Non-disclosure agreements are available upon request.</p>

      <h2>7. Project Termination</h2>
      <p>Either party may terminate the project with 30 days written notice. Client shall pay for all work completed up to the termination date.</p>
    </TermsContainer>
  )
}
