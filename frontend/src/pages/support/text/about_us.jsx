import React, { Fragment } from 'react';

export const about_usText = () => {
  return (
    <Fragment>
      <p>
        QuickBlocks (formerly called Great Hill Corporation) has been providing internet-based software since before the
        World Wide Web. In 1996, we released the first version of Calendars for the Web™, our popular interactive,
        web-based calendaring/scheduling system. We’ve been delivering this monthly service for more than 15 years,
        enabling 1,000s of clients to coordinate shared resources among their many participants.
      </p>
      <p></p>
      <p>
        Our dedication to quality software and customer service is reflected in our long, fruitful relationships with
        our clients. In early 2016, we pivoted our full attention to the Ethereum blockchain space. We first released
        EthSlurp™ in March of 2016. Since then we’ve been working on QuickBlocks™.
      </p>
      <img className="doc_images" alt={'the'} src={process.env.PUBLIC_URL + '/images/documentation_1.png'} />
      <p></p>
    </Fragment>
  );
};
