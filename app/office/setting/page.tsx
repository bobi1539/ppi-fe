"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../components/content-title";
import { settingFindById, settingUpdate } from "@/app/backend-api/setting";
import InputImage from "@/app/components/input/input-image";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { DIRECTORY_SETTING, SETTING_ID } from "@/app/constants/constant";
import InputLabel from "@/app/components/input/input-label";
import { SettingRequest } from "@/app/dto/request/setting-request";
import { buildUpdateFileUploadRequest, getFileFormData } from "@/app/utils/helper";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import { periodFindAll } from "@/app/backend-api/period";
import { eventFindAll } from "@/app/backend-api/event";
import ButtonIcon from "@/app/components/button/button-icon";

const LOGO: string = "logo";
const BANNER: string = "banner";
const QR_CODE: string = "qr-code";
const INSTAGRAM: string = "instagram";
const TIKTOK: string = "tiktok";
const LINKEDIN: string = "linkedin";
const YOUTUBE: string = "youtube";
const SUPPORT_ACCOUNT_NAME: string = "support-account-name";
const SUPPORT_ACCOUNT_NUMBER: string = "support-account-number";
const SUPPORT_SHORT_CODE: string = "support-short-code";
const CONTACT_EMAIL: string = "contact-email";
const CONTACT_PHONE_NUMBER: string = "contact-phone-number";
const PERIOD_ACTIVE_ID: string = "period-active-id";
const EVENT_GALLERY_ID: string = "event-gallery-id";

export default function Setting() {
  const [id, setId] = useState<number>(0);
  const [logo, setLogo] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [supportAccountName, setSupportAccountName] = useState<string>("");
  const [supportAccountNumber, setSupportAccountNumber] = useState<string>("");
  const [supportShortCode, setSupportShortCode] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string>("");
  const [periodOption, setPeriodOption] = useState<Option>();
  const [eventOption, setEventOption] = useState<Option>();
  const [periodOptions, setPeriodOptions] = useState<Option[]>([]);
  const [eventOptions, setEventOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetchSetting();
    fetchPeriod();
    fetchEvent();
  }, []);

  const fetchSetting = async (): Promise<void> => {
    const response = await settingFindById(SETTING_ID);
    setId(response.id);
    setLogo(response.logo);
    setBanner(response.banner);
    setQrCode(response.qrCode);
    setInstagram(response.instagram);
    setTiktok(response.tiktok);
    setLinkedin(response.linkedin);
    setYoutube(response.youtube);
    setSupportAccountName(response.supportAccountName);
    setSupportAccountNumber(response.supportAccountNumber);
    setSupportShortCode(response.supportShortCode);
    setContactEmail(response.contactEmail);
    setContactPhoneNumber(response.contactPhoneNumber);
    setPeriodOption({ value: response.periodActive.id.toString(), label: response.periodActive.name });
    setEventOption({ value: response.eventGallery.id.toString(), label: response.eventGallery.title });
  };

  const fetchPeriod = async (): Promise<void> => {
    const response = await periodFindAll({ search: "" });
    const options = response.map((period) => ({
      value: String(period.id),
      label: period.name,
    }));
    setPeriodOptions(options);
  };

  const fetchEvent = async (): Promise<void> => {
    const response = await eventFindAll({ search: "" });
    const options = response.map((event) => ({
      value: String(event.id),
      label: event.title,
    }));
    setEventOptions(options);
  };

  const submitUpdateSetting = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildSettingRequest(formData);
    await settingUpdate(id, request);
    await showSuccessDialog();
    await fetchSetting();
  };

  const buildSettingRequest = async (formData: FormData): Promise<SettingRequest> => {
    const logoFile = await getFileFormData(formData, LOGO);
    const bannerFile = await getFileFormData(formData, BANNER);
    const qrCodeFile = await getFileFormData(formData, QR_CODE);
    return {
      logo: logoFile ?? buildUpdateFileUploadRequest(logo),
      banner: bannerFile ?? buildUpdateFileUploadRequest(banner),
      qrCode: qrCodeFile ?? buildUpdateFileUploadRequest(qrCode),
      instagram: String(formData.get(INSTAGRAM)),
      tiktok: String(formData.get(TIKTOK)),
      linkedin: String(formData.get(LINKEDIN)),
      youtube: String(formData.get(YOUTUBE)),
      supportAccountName: String(formData.get(SUPPORT_ACCOUNT_NAME)),
      supportAccountNumber: String(formData.get(SUPPORT_ACCOUNT_NUMBER)),
      supportShortCode: String(formData.get(SUPPORT_SHORT_CODE)),
      contactEmail: String(formData.get(CONTACT_EMAIL)),
      contactPhoneNumber: String(formData.get(CONTACT_PHONE_NUMBER)),
      periodActiveId: Number(formData.get(PERIOD_ACTIVE_ID)),
      eventGalleryId: Number(formData.get(EVENT_GALLERY_ID)),
    };
  };

  return (
    <div>
      <ContentTitle title="Web Setting" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden p-4 pb-5">
        <form onSubmit={submitUpdateSetting}>
          <div className="grid md:grid-cols-2 gap-3">
            <InputSelectLabel option={periodOption} label="Committee Active" name={PERIOD_ACTIVE_ID} options={periodOptions} required />
            <InputSelectLabel option={eventOption} label="Event Gallery Active" name={EVENT_GALLERY_ID} options={eventOptions} required />
            <InputLabel label="Instagram Link" value={instagram} onChange={(e) => setInstagram(e.target.value)} name={INSTAGRAM} type="text" placeHolder="Type instagram link" isRequired={true} />
            <InputLabel label="Tiktok Link" value={tiktok} onChange={(e) => setTiktok(e.target.value)} name={TIKTOK} type="text" placeHolder="Type tiktok link" isRequired={true} />
            <InputLabel label="Linkedin Link" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} name={LINKEDIN} type="text" placeHolder="Type linkedin link" isRequired={true} />
            <InputLabel label="Youtube Link" value={youtube} onChange={(e) => setYoutube(e.target.value)} name={YOUTUBE} type="text" placeHolder="Type youtube link" isRequired={true} />
            <InputLabel label="Account Holder Name" value={supportAccountName} onChange={(e) => setSupportAccountName(e.target.value)} name={SUPPORT_ACCOUNT_NAME} type="text" placeHolder="Type account holder name" isRequired={true} />
            <InputLabel label="Account Number" value={supportAccountNumber} onChange={(e) => setSupportAccountNumber(e.target.value)} name={SUPPORT_ACCOUNT_NUMBER} type="text" placeHolder="Type account number" isRequired={true} />
            <InputLabel label="Short Code" value={supportShortCode} onChange={(e) => setSupportShortCode(e.target.value)} name={SUPPORT_SHORT_CODE} type="text" placeHolder="Type short code" isRequired={true} />
            <InputLabel label="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} name={CONTACT_EMAIL} type="text" placeHolder="Type contact email" isRequired={true} />
            <InputLabel label="Contact Phone Number" value={contactPhoneNumber} onChange={(e) => setContactPhoneNumber(e.target.value)} name={CONTACT_PHONE_NUMBER} type="text" placeHolder="Type contact phone number" isRequired={true} />
            <div />
            <InputImage label="Upload Logo" currentImage={logo} directoryName={DIRECTORY_SETTING} inputName={LOGO} classNameImagePreview="w-auto border border-gray-200 rounded-lg h-24 md:h-32" />
            <div className="row-span-2 flex justify-center items-center">
              <InputImage label="Upload Banner" currentImage={banner} directoryName={DIRECTORY_SETTING} inputName={BANNER} classNameImagePreview="w-auto border border-gray-200 rounded-lg h-40 md:h-32 lg:h-40 xl:h-64" />
            </div>
            <InputImage label="Upload Qr Code" currentImage={qrCode} directoryName={DIRECTORY_SETTING} inputName={QR_CODE} classNameImagePreview="w-auto border border-gray-200 rounded-lg h-24 md:h-32" />
          </div>
          <div className="flex justify-end mt-2">
            <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
          </div>
        </form>
      </section>
    </div>
  );
}
