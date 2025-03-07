"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { getJobBatch } from "@/api/jobs/index";
import { BaseDropDown } from "@/components/base/BaseDropDown";
import * as XLSX from "xlsx";
import { BaseModal } from "@/components/base/BaseModal";
import BaseLoader from "@/components/base/BaseLoader";

interface Option {
  id: number;
  label: string;
}
export default function Jobs() {
  const router = useRouter();
  const [filterData, setFilterData] = useState<{
    ["Date Posted"]: string | null;
    ["Experience Level"]: string | null;
    ["Job Type"]: string | null;
    ["Salary"]: string | null;
    ["Work Mode"]: string | null;
  }>({
    ["Date Posted"]: null,
    ["Experience Level"]: null,
    ["Job Type"]: null,
    ["Salary"]: null,
    ["Work Mode"]: null,
  });
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [tableData, setTableData] = useState<(string | number)[][]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorDialog, setErrorDialog] = useState<{ message: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const selectSettingHandler = async (
    selectedOption: Option,
    buttonIdentifier: string
  ) => {
    setFilterData({ ...filterData, [buttonIdentifier]: selectedOption.label });
  };

  const submitJobDetailsHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const jobDataResult = await getJobBatch({
        email: localStorage.getItem("verifiedEmail"),
        keyword: form.keyword.value,
        location: form.location.value,
        datePosted: filterData["Date Posted"],
        experienceLevel: filterData["Experience Level"],
        jobType: filterData["Job Type"],
        salary: filterData["Salary"],
        workMode: filterData["Work Mode"],
      });

      const blob = jobDataResult.data; // Axios directly provides the blob

      const url = URL.createObjectURL(blob);

      setFileUrl(url);
      setFileName(`${form.keyword.value.split(" ").join("_")}_Jobs.xlsx`);

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(
          sheet,
          { header: 1 }
        );
        setTableData(jsonData);
      };

      reader.readAsArrayBuffer(blob);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorDialog({
          message: error.message ?? "",
        });
      } else {
        setErrorDialog({
          message: "Something went wrong.",
        });
      }
    }

    setIsLoading(false);
  };

  const checkUserValidityHandler = async () => {
    const loggedInUser = localStorage.getItem("verifiedEmail");
    if (!loggedInUser) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkUserValidityHandler();
  }, []);

  const CustomButton = ({
    children,
    customClasses,
    onClick,
    as = "button",
    href = undefined,
  }: {
    children: ReactNode;
    onClick: () => void;
    customClasses?: string;
    as?: string;
    href?: string | undefined;
  }) => {
    const Component = as === "a" ? "a" : "button";
    return (
      <Component
        onClick={onClick}
        href={href}
        className={`px-4 py-2 border rounded flex items-center ${customClasses}`}
      >
        {children}
      </Component>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <form
        onSubmit={submitJobDetailsHandler}
        className="flex flex-col items-start justify-center w-full max-w-6xl space-y-4 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="flex items-center justify-center w-full space-x-4">
          <input
            name="keyword"
            className="p-2 border-2 border-gray-300 rounded-lg w-full focus:border-primary focus:ring-0 transition-colors"
            placeholder="Eg: Software Engineer"
          />
          <input
            name="location"
            className="p-2 border-2 border-gray-300 rounded-lg w-1/2 focus:border-primary focus:ring-0 transition-colors"
            placeholder="Eg: United States"
          />
          <button
            disabled={isLoading}
            className="rounded-lg bg-primary disabled:opacity-80 disabled:hover:bg-primary text-white px-4 py-2 font-semibold h-[42px] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            {isLoading ? (
              <BaseLoader
                colorClasses="border-t-white"
                sizeClasses="h-6 w-6"
                borderClasses="border-2 border-t-2"
              />
            ) : (
              <p>Fetch!</p>
            )}
          </button>
        </div>
        <div className="flex space-x-4 w-full">
          <div className="w-1/5">
            <BaseDropDown
              onSelect={selectSettingHandler}
              options={[
                { id: 0, label: "Internship" },
                { id: 1, label: "Entry Level" },
                { id: 2, label: "Associate" },
                { id: 3, label: "Mid Senior Level" },
                { id: 4, label: "Director" },
                { id: 5, label: "Executive" },
              ]}
              defaultText="Experience Level"
            />
          </div>
          <div className="w-1/5">
            <BaseDropDown
              onSelect={selectSettingHandler}
              options={[
                { id: 0, label: "Any Time" },
                { id: 1, label: "Past Month" },
                { id: 2, label: "Past Week" },
                { id: 3, label: "Past 24 Hours" },
              ]}
              defaultText="Date Posted"
            />
          </div>
          <div className="w-1/5">
            <BaseDropDown
              onSelect={selectSettingHandler}
              options={[
                { id: 0, label: "$40,000+" },
                { id: 1, label: "$60,000+" },
                { id: 2, label: "$80,000+" },
                { id: 3, label: "$100,000+" },
                { id: 4, label: "$120,000+" },
                { id: 5, label: "$140,000+" },
                { id: 6, label: "$160,000+" },
                { id: 7, label: "$180,000+" },
                { id: 8, label: "$200,000+" },
              ]}
              defaultText="Salary"
            />
          </div>
          <div className="w-1/5">
            <BaseDropDown
              onSelect={selectSettingHandler}
              options={[
                { id: 0, label: "On-Site" },
                { id: 1, label: "Remote" },
                { id: 2, label: "Hybrid" },
              ]}
              defaultText="Work Mode"
            />
          </div>
          <div className="w-1/5">
            <BaseDropDown
              onSelect={selectSettingHandler}
              options={[
                { id: 0, label: "Full Time" },
                { id: 1, label: "Part Time" },
                { id: 2, label: "Contract" },
                { id: 3, label: "Temporary" },
                { id: 4, label: "Volunteer" },
                { id: 5, label: "Internship" },
              ]}
              defaultText="Job Type"
            />
          </div>
        </div>
      </form>

      <div className="p-4">
        <div className="flex space-x-2 items-center h-16">
          {fileUrl && (
            <CustomButton
              onClick={() => {
                if (!fileUrl) return;
                setIsOpen(true);
              }}
              customClasses={`border border-excel-green text-excel-green font-medium rounded-md`}
            >
              Preview Excel
            </CustomButton>
          )}
          {fileUrl && (
            <CustomButton
              onClick={() => {
                if (!fileUrl) return;
              }}
              customClasses={`bg-excel-green text-white font-medium rounded-md`}
            >
              <a href={fileUrl} download={fileName}>
                Download Excel
              </a>
            </CustomButton>
          )}
        </div>
        <BaseModal
          title="Excel Preview"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isDownloadOption={true}
          download={fileUrl}
          fileName={fileName}
        >
          <div className=" w-full flex flex-col">
            {tableData.length > 0 && (
              <table className="min-w-full border-separate  border-spacing-0 border">
                <thead className="">
                  <tr className="bg-gray-100 sticky top-0 z-1 ">
                    {tableData[0]?.map((header, index) => (
                      <th
                        key={index}
                        className=" px-4 py-2 text-left border resize-x overflow-x-scroll"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="overflow-y-auto border-collapse">
                  {tableData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="border">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </BaseModal>
      </div>

      <BaseModal
        title="Search Limit Reached!"
        isOpen={!!errorDialog}
        onClose={() => setErrorDialog(null)}
        isDownloadOption={false}
      >
        <div>{errorDialog?.message}</div>
      </BaseModal>
    </div>
  );
}
