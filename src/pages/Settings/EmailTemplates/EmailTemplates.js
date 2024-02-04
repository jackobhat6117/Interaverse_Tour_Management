import React, { useEffect, useRef, useState } from "react";
import TextInput from "../../../components/form/TextInput";
import { MenuItem } from "@mui/material";
import Button1 from "../../../components/form/Button1";
import SuccessStandard from "../../../components/DIsplay/SuccessStandard";
import ErrorStandard from "../../../components/DIsplay/ErrorStandard";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import getWebhookEvents from "../../../controllers/webhook/getWebookEvent";
import getEmailVariables from "../../../controllers/settings/emailTemplates/getEmailVariables";
import { toPascalCase } from "../../../utils/toPascal";
import CopyToClipboardButton from "../../../components/common/CopyToClipboard";
import createEmailTemplate from "../../../controllers/settings/emailTemplates/createEmailTemplate";

export default function EmailTemplateSettings() {
  const editorRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [variables, setVariables] = useState();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    event: "",
    email: "",
    title: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await Promise.allSettled([
      getWebhookEvents(),
      getEmailVariables(),
    ]);
    if (res[0].value.data) {
      setEvents(res[0].value.data || []);
    }
    if (res[1].value.return) {
      setVariables(res[1].value.data);
    }
  }

  async function handleSubmit() {
    const editorInstance = editorRef.current.editor;
    if (editorInstance) {
      const htmlData = editorInstance.getData();
      const dataToSend = {
        ...formValues,
        template: htmlData,
      };
      setLoading(true);
      await createEmailTemplate(dataToSend);
      setLoading(false);
    }
  }
  return (
    <div className="content-max-w flex flex-col gap-4">
      <div className="flex gap-2 flex-col">
        <h5>Email Templates</h5>
        <p>
          Update the content of all email notification sent to your customers
          here or leave as it is and we will use the default notifications.
        </p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          select
          label="Event"
          name="event"
          placeholder={"select"}
          required
          value={formValues.event}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              event: e.target.value,
            });
          }}
        >
          {events?.map((event, index) => (
            <MenuItem key={index} value={event}>
              {event}
            </MenuItem>
          ))}
        </TextInput>
        <TextInput
          label="Select Email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              email: e.target.value,
            });
          }}
        />
        <TextInput
          label="Email Title"
          placeholder={"Enter email title here"}
          name="title"
          required
          value={formValues.title}
          onChange={(e) => {
            setFormValues({
              ...formValues,
              title: e.target.value,
            });
          }}
        />

        {variables &&
          Object.keys(variables).map((variableTitle, index) => (
            <div key={index}>
              <div className="font-bold">{toPascalCase(variableTitle)}</div>
              <div className="flex justify-between gap-4 flex-wrap py-4">
                {variables[variableTitle] &&
                  variables[variableTitle]?.map((variable, i) => (
                    <SomeComp
                      className={"w-full sm:w-[40%]"}
                      name={variable}
                      key={i}
                    />
                  ))}
              </div>
            </div>
          ))}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <b>Body</b>
            <button className="btn-theme !py-1 rounded-md">Edit</button>
          </div>
          <CKEditor
            editor={ClassicEditor}
            ref={editorRef}
            config={{
              placeholder: "Email body goes here",
            }}
            onChange={(ev, editor) => console.log(editor.getData())}
            data=""
          />
          {/* <TextInput multiline rows={6} label='' placeholder='Email body goes here' /> */}
        </div>
        <div className="flex justify-between gap-4 py-4">
          <button className="btn-theme-light">Cancel</button>
          <Button1 type="submit" loading={loading}>
            Confirm
          </Button1>
        </div>
      </form>
      <div className="py-4">
        <SuccessStandard
          title={"Well done!"}
          message={"You have successfully updated the content of your email."}
          allowClose
        />
        <ErrorStandard
          title={"Warning!"}
          message={
            "An error occured while trying to update the content of your email."
          }
          allowClose
        />
      </div>
    </div>
  );
}

function SomeComp({ className, name }) {
  return (
    <div className={className + " flex gap-4 items-center"}>
      <p className="">{`{{${name}}}`}</p>
      <CopyToClipboardButton textToCopy={`{{${name}}}`} />
    </div>
  );
}
