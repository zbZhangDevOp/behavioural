'use client';

import React, { use, useEffect } from 'react';

interface DisplayNotesProps {
  notes: string;
}

export default function DisplayNotes({ notes }: DisplayNotesProps) {
  useEffect(() => {
    console.log(notes);
  }, []);
  return <div>{notes}</div>;
}
