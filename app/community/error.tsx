"use client"

import React from "react";

export default function Error({ error, reset }: any) {
    React.useEffect(() => {
        console.log('logging error:', error);
    }, [error]);

    return (
        <article className="message is-danger">
          <div className="message-header">
            <p>Error</p>
            <button className="delete" aria-label="delete"></button>
          </div>
          <div className="message-body">
              {error?.message}
              <br />
              <div>
                  <button onClick={() => reset()}>Try Again</button>
              </div>
          </div>

        </article>
    )
}