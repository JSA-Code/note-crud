"use client";

import { useState, useEffect } from "react";
import { putAction } from "@/libs/actions";

export default function EditBtn({ notes }) {
  const [data, setData] = useState(notes);
  const [oldData, setOldData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let foundOldData = JSON.parse(localStorage.getItem("oldData"));
      setOldData(foundOldData);
    }
  }, []);

  function isStateEqual() {
    if (JSON.stringify(oldData) === JSON.stringify(data)) {
      return true;
    }
    return false;
  }

  const onNotFocus = async (e, id) => {
    e.preventDefault();

    // console.log(JSON.stringify(oldData) === JSON.stringify(data));
    if (typeof window !== "undefined" && window.localStorage) {
      // console.log("INSIDE");
      localStorage.setItem("oldData", JSON.stringify(data));
      let foundOldData = JSON.parse(localStorage.getItem("oldData"));
      setOldData(foundOldData);
    }
    console.log(`IF EQUAL:\n${isStateEqual()}`);

    if (e.target.value.trim() !== "" && !isStateEqual()) {
      console.log("PUT REQUEST");
      try {
        const checkRes = await putAction(id, e.target.value);

        if (!checkRes) {
          throw new Error(`Failed to update note. Error: ${res.status}`);
        }

        window.location.reload();
      } catch (error) {
        console.log(`Error while updating note: ${error}`);
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };
  return <div>EDIT BTN</div>;
}
