import React from "react";

const MessageComposer = (props) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white border border-gray-300 rounded-xl shadow-sm">
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your name (optional)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => {
              props.setUsername(e.target.value);
            }}
            value={props.username}
          />

          <textarea
            name="message"
            id="message"
            placeholder="What's happening?"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            onChange={(e) => {
              props.setMessage(e.target.value);
            }}
            value={props.message}
            rows={3}
          ></textarea>

          {props.messageError && (
            <div className="text-red-500 text-sm">{props.messageError}</div>
          )}

          <div className="flex justify-end">
            <button
              onClick={props.submitMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm font-semibold transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
