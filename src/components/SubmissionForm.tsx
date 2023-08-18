import React from "react";
import { useForm } from "react-hook-form";
import formStyles from "../styles/Form.module.scss";

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const url = "http://localhost:8082/api/articles";

    const realAuthors = data.authors.split(",");
    data.authors = realAuthors;

    data.description = "";
    if (data.claims) {
      data.description += "Claim: " + data.claim;
    }

    if (data.evidence) {
      data.description += "Evidence: " + data.evidence;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          {...register("title")}
          type="text"
          id="title"
          placeholder="Title"
        />
      </div>

      <div>
        <label htmlFor="authors">Authors:</label>
        <input
          {...register("authors")}
          type="text"
          id="authors"
          placeholder="Authors"
        />
      </div>

      <div>
        <label htmlFor="source">Source:</label>
        <input
          {...register("source")}
          type="text"
          id="source"
          placeholder="Source"
        />
      </div>

      <div>
        <label htmlFor="pubYear">Publication Year:</label>
        <input
          {...register("pubYear")}
          type="text"
          id="pubYear"
          placeholder="Publication Year"
        />
      </div>

      <div>
        <label htmlFor="doi">DOI:</label>
        <input {...register("doi")} type="text" id="doi" placeholder="DOI" />
      </div>

      <div>
        <label htmlFor="summary">Summary:</label>
        <input
          {...register("summary")}
          type="text"
          id="summary"
          placeholder="Summary"
        />
      </div>

      <div>
        <label htmlFor="linkedDiscussion">Linked Discussion:</label>
        <input
          {...register("linkedDiscussion")}
          type="text"
          id="linkedDiscussion"
          placeholder="Linked Discussion"
        />
      </div>

      <input type="submit" />
    </form>
  );
}
