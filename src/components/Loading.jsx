import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <svg className="animate-spin h-8 w-8 rounded-md bg-blue-500 m-5" viewBox="0 0 24 24"></svg> 
        <svg className="animate-spin h-8 w-8 rounded-md bg-blue-500 m-5" viewBox="0 0 24 24"></svg> 
        <svg className="animate-spin h-8 w-8 rounded-md bg-blue-500 m-5" viewBox="0 0 24 24"></svg> 
      </div>
      <h1 className="text-3xl mt-4 animate-pulse">Loading</h1>
    </div>
  );
}