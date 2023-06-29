import React from "react";

export const getGraphQLFetch = async (query, variables = {}) => {

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(process.env.API_HOST, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: query, variables: variables })
  });

  return await response.json();
}
