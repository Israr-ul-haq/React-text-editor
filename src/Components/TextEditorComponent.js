import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useParams } from "react-router-dom";
import { getById, refreshNotification, update } from "./TextEditor";
import Popoup from "./popup";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

function TextEditorComponent() {
  const { id, lessonId } = useParams();
  const [btnlock, setbtnlock] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    getData();
  }, []); //eslint-disable-line

  const getData = async () => {
    const response = await getById(id, lessonId);
    console.log(response);
    // setEditorState(
    //   EditorState.createWithContent(
    //     ContentState.createFromBlockArray(
    //       convertFromHTML(response.data.data[0]?.assessmentString)
    //     )
    //   )
    // );
    const html = response.data.data[0]?.assessmentString;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
      contentBlock.entityMap
    );
    const inputEditorState = EditorState.createWithContent(contentState);
    setEditorState(inputEditorState);
    console.log(inputEditorState);
  };

  const submitForm = async (save) => {
    debugger;
    const body = {
      userId: id,
      lessonId: lessonId,
      userLessonAssessments: [
        {
          TempSave: save === "true" ? true : false,
          AssessmentString: draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          ),
        },
      ],
    };
    console.log(body);
    const response = await update(body);
    if (response.data.code === 1) {
      if (save === "false") {
        setbtnlock(true);
        Popoup(id, lessonId, refreshNotification, "Submitted");
      } else {
        Popoup(id, lessonId, refreshNotification, "Saved");
      }
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={(e) => onEditorStateChange(e)}
        // defaultEditorState={editorState}
      />
      <div className="button_section">
        <button
          disabled={btnlock}
          className="update_button"
          onClick={(e) => submitForm(e.target.value)}
          value={false}
        >
          Submit
        </button>
        <button
          className="update_button"
          onClick={(e) => submitForm(e.target.value)}
          value={true}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default TextEditorComponent;
