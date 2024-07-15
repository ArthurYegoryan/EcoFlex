import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function Time({
    label,
    defaultTime,
    width,
    fields,
    setField,
    changeFieldName
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DesktopTimePicker',
        ]}
      >
        <DemoItem label={label}>
          <DesktopTimePicker defaultValue={dayjs(defaultTime)}
                             slotProps={{textField: {size: "small"}}}
                             sx={{width: width}}
                             onChange={(time) => setField({ ...fields, [changeFieldName]: time.toString().slice(17, 22)})} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}