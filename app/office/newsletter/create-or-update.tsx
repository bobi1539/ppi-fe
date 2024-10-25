"use client";

import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_NEWSLETTER } from "@/app/constants/constant";
import InputLabel from "@/app/components/input/input-label";
import { FE_NEWSLETTER } from "@/app/constants/endpoint-fe";
import Link from "next/link";
import ButtonIcon from "@/app/components/button/button-icon";
import TextArea from "@/app/components/input/text-area";
import { TITLE, DESCRIPTION, CONTENT } from "./helper";
import ContentTitle from "../components/content-title";
import { useEffect, useState } from "react";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import InputFile from "@/app/components/input/input-file";
import { imageDownload } from "@/app/backend-api/file";
import ButtonBack from "@/app/components/button/button-back";

interface EventCreateOrUpdateProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  newsletter?: NewsletterResponse;
}

export default function NewsletterCreateOrUpdate(props: Readonly<EventCreateOrUpdateProps>) {
  const [cover, setCover] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (props.newsletter) {
      setCover(props.newsletter.cover);
      setContent(props.newsletter.content);
      setTitle(props.newsletter.title);
      setDescription(props.newsletter.description);
    }
  }, [props.newsletter]);

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <ContentTitle title={props.title} />
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={props.submit}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4 justify-center">
              <div className="col-span-2">
                <InputImage label="Upload Cover" currentImage={cover} directoryName={DIRECTORY_NEWSLETTER} inputName={"cover"} classNameImagePreview="border border-gray-200 rounded-lg" />
              </div>
              <div className="col-span-3 flex flex-col gap-3">
                <InputLabel label="Title" value={title} onChange={(e) => setTitle(e.target.value)} name={TITLE} type="text" placeHolder="Type title" isRequired={true} />
                <TextArea label="Description" currentValue={description} onChange={(e) => setDescription(e.target.value)} name={DESCRIPTION} rows={10} isRequired />
                <InputFile name={CONTENT} label="File Content" isRequired={content === ""} accept="image/*,video/*,audio/*,application/pdf" />
                {content !== "" ? (
                  <Link href={imageDownload(DIRECTORY_NEWSLETTER, content)} target="_blank" className="text-secondary-700 underline text-sm -mt-3">
                    {content}
                  </Link>
                ) : (
                  <span className="sr-only">content-file</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_NEWSLETTER} />
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
