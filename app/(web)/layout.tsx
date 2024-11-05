"use client";

import { useEffect, useState } from "react";
import Footer from "./layouts/footer";
import Navbar from "./layouts/navbar";
import { SettingResponse } from "../dto/response/setting-response";
import { webSettingFindById } from "../backend-api/setting";
import { SETTING_ID } from "../constants/constant";

interface MainMenuLayoutProps {
  children: React.ReactNode;
}

export default function MainMenuLayout(props: Readonly<MainMenuLayoutProps>) {
  const [setting, setSetting] = useState<SettingResponse>();

  useEffect(() => {
    fetchSetting();
  }, []);

  const fetchSetting = async (): Promise<void> => {
    const response = await webSettingFindById(SETTING_ID);
    setSetting(response);
  };

  return (
    <div>
      <Navbar urlLogo={setting?.logo ?? ""} />
      <main>{props.children}</main>
      <Footer urlLogo={setting?.logo ?? ""} contactEmail={setting?.contactEmail ?? ""} contactPhoneNumber={setting?.contactPhoneNumber ?? ""} />
    </div>
  );
}
