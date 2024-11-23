import React from "react";

interface Item {
  number: string | number;
  text: string;
  list?: Item[];
}

interface TermsGroupProps {
  number: string | number;
  title: string;
  paragraph?: string;
  paragraphs?: string[];
  list?: Item[];
}

const TermsGroup = ({
  title,
  paragraph,
  paragraphs,
  list = [],
  number,
}: TermsGroupProps) => {
  return (
    <div className="mb-4 flex">
      <span className="font-semibold text-lg lg:text-xl mr-1 sm:mr-2">
        {number}
      </span>
      <div>
        <h3 className="font-semibold text-lg lg:text-xl mb-1 sm:mb-2">
          {title}
        </h3>

        <div>
          {paragraph ? (
            <p
              className="leading-relaxed text-base lg:leading-relaxed lg:text-lg mb-1 sm:mb-2"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          ) : null}
          {paragraphs?.map((paragraph, index) => (
            <p
              key={index}
              className="leading-relaxed text-base lg:leading-relaxed lg:text-lg mb-1 sm:mb-2"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          ))}
        </div>

        {list?.length > 0 ? (
          <div className="space-y-2">
            {list.map((item, index) => (
              <div
                key={index}
                className="flex leading-relaxed text-base lg:leading-relaxed lg:text-lg"
              >
                <span className="mr-1 sm:mr-2 text-app-text-dark font-medium">
                  {item.number}
                </span>
                <div>
                  <p>{item.text}</p>
                  {item.list ? (
                    <div className="mt-2 space-y-1">
                      {item.list.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex leading-relaxed text-base lg:leading-relaxed lg:text-lg"
                        >
                          <span className="mr-1 sm:mr-2 text-app-text-dark font-medium">
                            {item.number}
                          </span>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TermsGroup;
