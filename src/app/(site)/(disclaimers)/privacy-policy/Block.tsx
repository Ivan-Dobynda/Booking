import React from "react";

interface BlockProps {
  block: any;
}
const Block = ({ block }: BlockProps) => {
  return (
    <div className="privacy-policy-block">
      {block?.title ? (
        <h2 className="font-semibold text-lg lg:text-xl mb-1 sm:mb-2">
          {block?.title}
        </h2>
      ) : null}

      {block?.text ? (
        <p
          className="leading-relaxed text-base lg:leading-relaxed lg:text-lg"
          dangerouslySetInnerHTML={{ __html: block?.text }}
        ></p>
      ) : null}
      {block?.list ? (
        <ul className="list-inside list-disc">
          {block?.list?.map((item: string, index: number) => (
            <li
              key={index}
              className="leading-relaxed text-base lg:leading-relaxed lg:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="space-y-4">
        {block?.blocks
          ? block.blocks?.map((block: any, index: number) => (
              <div key={index}>
                {block?.title ? (
                  <h3 className="leading-relaxed text-base lg:leading-relaxed lg:text-lg italic font-medium">
                    {block?.title}
                  </h3>
                ) : null}

                <p
                  className="leading-relaxed text-base lg:leading-relaxed lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: block?.text }}
                ></p>
                {block?.list ? (
                  <ul className="list-inside list-disc">
                    {block?.list?.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="leading-relaxed text-base lg:leading-relaxed lg:text-lg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Block;
