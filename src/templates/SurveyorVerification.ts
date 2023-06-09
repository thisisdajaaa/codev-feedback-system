export const SurveyorVerification = (url: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <main>
      <section>
         <p>Kindly click this <a href=${url}>link</a> to verify your account.</p>
      </section>
    </main>
  </body>
  </html>
  `;
};

export const SurveyInvitesNotification = (url: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <main>
      <section>
         <p>You are invited to participate in a survey. Kindly click this <a href=${url}>link</a> if you wish to take the survey now.</p>
      </section>
    </main>
  </body>
  </html>
  `;
};
