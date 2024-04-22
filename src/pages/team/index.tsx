import NavBar from "@/components/NavBar/NavBar";

import PositionRelativeLayout from "@/components/PositionRelativeLayout/PositionRelativeLayout";
import Team from "@/components/Team/Team";
import React from "react";

export default function TeamPage() {
  return (
    <>
      <PositionRelativeLayout>
        <Team />
      </PositionRelativeLayout>
    </>
  );
}
