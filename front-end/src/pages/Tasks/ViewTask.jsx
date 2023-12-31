import { useState, useEffect } from "react";
import Attachment from "../Project management/Attachement";
import { Button, Input } from "../../components/Globals";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";

const ViewTask = () => {
  const { task_id } = useParams();
  const [description, setDescription] = useState("");
  const [refusal, setRefusal] = useState('')
  const [wordCount, setWordsCount] = useState(0);
  const MAX_WORDS = 100;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [status, setStatus] = useState("");
  const handleApprove = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await API.put(`/tasks/${task_id}/validate`, {
        validated: true,
      });
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  const handleRefuse = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await API.put(`/tasks/${task_id}/validate`, {
        refusal_motif: refusal,
        validated: false,
      });
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await API.get(`/tasks/${task_id}`);
      setDescription(res.data.data.task.description);
      setStatus(res.data.data.task.status);
      let count =
        res.data.data.task.description === ""
          ? 0
          : res.data.data.task.description.trim().split(/\s+/).length;
      setWordsCount(count);
      setAttachments(
        Object.entries(res.data.data.task.resources).map(([key, value]) => ({
          key,
          value,
        }))
      );
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {description && (
        <section className="px-layout pb-8">
          <div className="text-secondaryColor text-fs-400 font-medium">
            Task submission approval
          </div>
          <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
            In this page, you as a supervisor can view the final work of this
            task submitted by the team. Please review the work and provide an
            approval/ refusal of this work.
          </p>
          <div className="max-w-[22.5rem]">
            <div className="text-thirdColor text-fs-400 pb-3 pt-8">
              Informations
            </div>
            <div
              className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
            >
              <div className="relative w-full">
                <textarea
                  disabled={true}
                  value={description}
                  placeholder="Description..."
                  rows={8}
                  className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                />
                <span
                  className={` absolute bottom-0 right-10 ${
                    wordCount > MAX_WORDS ? "text-mainRed" : "text-thirdColor"
                  }`}
                >
                  {wordCount} - {MAX_WORDS} words
                </span>
              </div>
            </div>
            <Input 
              label="Refusal Motif (if submission refused)" 
              icon="note-2" 
              inputProps={{
                value:refusal,
                onChange:(e) => setRefusal(e.target.value)
              }}
            />
            <div className="text-thirdColor text-fs-400 pb-3 pt-8">
              Required attachments
            </div>
            <ul className="pb-8">
              {attachments.map((item, index) => {
                 if (item.value) {
                  return (
                    <Attachment
                      key={index}
                      id={index}
                      title={item.key}
                      name={item.value.name}
                      isEdit={false}
                      isUpload={false}
                      isDownload={true}
                      filePath={item.value.link}
                    />
                  );
                } else {
                  return (
                    <Attachment
                      key={index}
                      id={index}
                      title={item.key}
                      name={"Empty"}
                      isEdit={false}
                      isUpload={false}
                      isDownload={false}
                    />
                  );
                }
              })}
            </ul>
            {status !== "completed" && (
              <div className="flex flex-col justify-center">
                <Button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to make this task as completed?"
                      )
                    ) {
                      handleApprove();
                    } else {
                    }
                  }}
                >
                  Approve
                </Button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to refuse this task?")) {
                      handleRefuse();
                    } else {
                    }
                  }}
                  className="text-primaryColor py-4 "
                >
                  Refuse
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ViewTask;
