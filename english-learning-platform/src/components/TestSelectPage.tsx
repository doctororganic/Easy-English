import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function TestSelectPage() {
  const [grade, setGrade] = useState('10');
  const [unit, setUnit] = useState('1');

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Test Select Components</h1>
      
      <div className="space-y-2">
        <label>Grade: {grade}</label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Grade 10</SelectItem>
            <SelectItem value="11">Grade 11</SelectItem>
            <SelectItem value="12">Grade 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label>Unit: {unit}</label>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Unit 1</SelectItem>
            <SelectItem value="2">Unit 2</SelectItem>
            <SelectItem value="3">Unit 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}