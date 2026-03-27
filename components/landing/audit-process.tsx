import Image from "next/image";

/**
 * Step icons: replace files under public/images/landing/process/
 * (1.svg → 1.png, or edit `iconSrc`). Recommended size ~56×56 within a circle.
 */
const STEPS: {
  step: number;
  label: string;
  iconSrc: string;
}[] = [
    {
      step: 1,
      label: "Submit Contract & Information",
      iconSrc: "/images/landing/process/1.png",
    },
    {
      step: 2,
      label: "Automated Analysis",
      iconSrc: "/images/landing/process/2.png",
    },
    {
      step: 3,
      label: "Manual Security Review",
      iconSrc: "/images/landing/process/3.png",
    },
    {
      step: 4,
      label: "Vulnerability Report",
      iconSrc: "/images/landing/process/4.png",
    },
    {
      step: 5,
      label: "Project Fix Issues",
      iconSrc: "/images/landing/process/5.png",
    },
    {
      step: 6,
      label: "Final Audit Certificate",
      iconSrc: "/images/landing/process/6.png",
    },
  ];

const ICON_SIZE = 72;

export function AuditProcess() {
  return (
    <section
      className="relative bg-[#010D23] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="audit-process-heading"
    >
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="audit-process-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            How Our Audit Process Works
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Our transparent and proven audit methodology.
          </p>
        </header>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="relative mx-auto mt-14 max-w-md lg:hidden">
          <div
            className="absolute bottom-4 left-[27px] top-4 w-px bg-linear-to-r from-transparent via-cyan-400/35 to-transparent"
            aria-hidden
          />
          {STEPS.map((item) => (
            <li key={item.step} className="relative flex gap-4 pb-10 last:pb-0">
              <div className="relative z-1 shrink-0">
                <div className="flex size-14 items-center justify-center rounded-full shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-2">
                <p className="text-base font-medium text-cyan-200/90">
                  <span className="text-[#696E7D]">{item.step}</span>{". "}
                  <span className="text-[#696E7D]">{item.label}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: horizontal process */}
        <div className="relative mt-16 hidden lg:block">
          <div
            className="pointer-events-none absolute left-[5%] right-[5%] top-[31px] h-px bg-linear-to-r from-transparent via-cyan-400/35 to-transparent"
            aria-hidden
          />
          <ol className="relative grid grid-cols-6 gap-2">
            {STEPS.map((item) => (
              <li
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-1 mb-5 flex size-[80px] items-center justify-center rounded-full shadow-[0_0_22px_rgba(34,211,238,0.28)]">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    className="object-contain"
                  />
                </div>
                <p className="max-w-38 text-sm flex flex-col gap-1 font-medium leading-snug text-slate-300">
                  <span className="text-[#696E7D]">{item.step}</span>{" "}
                  <span className="text-[#696E7D]">{item.label}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
