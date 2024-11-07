/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CircleStackIcon,
  ClipboardDocumentCheckIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import useUiLang from "../../hooks/useUiLang.store";
import { useState } from "react";

export default function UILang() {
  const [isMinimise, setIsMinimise] = useState(true);
  const [filterValue, setFilterValue] = useState("");

  const { uiLan: _, currentUiText, updateUiLan } = useUiLang();
  return (
    <>
      <div
        className={`absolute z-50 bottom-0 right-0 bg-base-100 shadow-primary-dark shadow-sm p-3 ${
          isMinimise ? "hidden" : ""
        }`}
      >
        <div
          id="lanUi"
          className={`card card-compact  bg-base-100 w-96 shadow-xl rounded-sm relative z-50`}
        >
          <figure className="h-auto">
            <div className="flex justify-center items-center">
              {/* SORT INTRO FOR THE MENU ************************************************************************************** SORT INTRO FOR THE MENU */}
              <div className="flex items-center m-1 gap-1  select-none">
                <ClipboardDocumentCheckIcon className="size-8 text-primary" />
                <span className="w-24 text-primary">SUPER Fill</span>
              </div>

              {/* FILTER TEH LANGUAGE LIST ************************************************************************************** FILTER TEH LANGUAGE LIST */}
              <label className="input input-bordered flex items-center gap-2  mt-1">
                <input
                  type="text"
                  className="grow"
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder={_("filter")}
                  value={filterValue}
                />
                <FunnelIcon className="text-primary  z-50 size-6" />
              </label>
            </div>
          </figure>
          {/* DIVIDER ************************************************************************************** DIVIDER */}
          <div className="divider  m-0 p-0 z-50"></div>
          <div className="card-body min-h-52 max-h-52 overflow-y-auto overflow-x-hidden text-ellipsis">
            {/* CONTENT ************************************************************************************** CONTENT */}
            {currentUiText
              .getCurrentText()
              .filter((text: any) => text!.includes(filterValue.toLowerCase()))
              .sort((a: any, b) => a.localeCompare(b))
              .map((text: any, i) => (
                <input
                  onChange={(e: any) => updateUiLan(text, e.target.value)}
                  onBlur={(e: any) => (e.target.value = "")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Escape")
                      e.currentTarget.blur();
                  }}
                  type="text"
                  key={i}
                  placeholder={_(text)}
                  className="input w-full max-w-xs border-b-base-200"
                />
              ))}
          </div>
          {/* DIVIDER ************************************************************************************** DIVIDER */}
          <div className="divider  m-0 p-0 z-50"></div>

          {/* FOOTER PART ************************************************************************************** FOOTER PART */}

          <div className="flex gap-4 bg-base-200">
            <button
              className="flex w-5/6 items-center justify-center gap-3 bg-base-200 p-2 m
        -0 rounded-sm"
            >
              <CircleStackIcon className="size-6" /> {_("Send")}
            </button>

            {/* MINIMISE BUTTON ************************************************************************************** MINIMISE BUTTON */}
            <BarsArrowDownIcon
              onClick={() => setIsMinimise(true)}
              className="size-9 m-1   cursor-pointer border-2 border-primary rounded-md p-2"
            />
          </div>
        </div>
      </div>
      {/* SHOW THE MENU BUTTON ************************************************************************************** SHOW THE MENU BUTTON */}
      {isMinimise && (
        <BarsArrowUpIcon
          onClick={() => setIsMinimise(false)}
          className={`size-9 text-primary rounded-md p-2 border-primary border-2 absolute z-50 cursor-pointer right-3 bottom-3`}
        />
      )}
    </>
  );
}
