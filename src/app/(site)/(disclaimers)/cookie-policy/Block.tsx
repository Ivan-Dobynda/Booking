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
          className="leading-relaxed text-base lg:leading-relaxed lg:text-lg mb-3"
          dangerouslySetInnerHTML={{ __html: block?.text }}
        ></p>
      ) : null}
      {block?.list ? (
        <ul className="list-inside list-disc space-y-2 pl-5">
          {block?.list?.map((item: any, index: number) => (
            <li
              key={index}
              className="leading-relaxed text-base lg:leading-relaxed lg:text-lg -indent-[25px] pl-[25px]"
            >
              <span dangerouslySetInnerHTML={{ __html: item?.text }}></span>
              {item.list ? (
                <ul className="list-disc list-inside space-y-2 mt-2">
                  {item?.list?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="leading-relaxed text-base lg:leading-relaxed lg:text-lg -indent-[25px] pl-[25px]"
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: item?.text }}
                      ></span>
                    </li>
                  ))}
                </ul>
              ) : null}
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

                {block?.text ? (
                  <p
                    className="leading-relaxed text-base lg:leading-relaxed lg:text-lg mb-3"
                    dangerouslySetInnerHTML={{ __html: block?.text }}
                  ></p>
                ) : null}
                {block?.list ? (
                  <ul className="list-inside list-disc space-y-2 pl-5">
                    {block?.list?.map((item: any, index: number) => (
                      <li
                        key={index}
                        className="leading-relaxed text-base lg:leading-relaxed lg:text-lg -indent-[25px] pl-[25px]"
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: item?.text }}
                        ></span>
                        {item.list ? (
                          <ul className="list-disc list-inside space-y-2 mt-2">
                            {item?.list?.map((item: any, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed text-base lg:leading-relaxed lg:text-lg -indent-[25px] pl-[25px]"
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item?.text,
                                  }}
                                ></span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
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
