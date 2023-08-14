import React, { useEffect, useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const DocumentTitle = () => {
  const [count, setCount] = useState(0);

  useDocumentTitle(count);

  return <button onClick={() => setCount(count + 1)}>count {count}</button>;
};

export default DocumentTitle;
