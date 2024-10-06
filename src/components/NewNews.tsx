import {Box, Button, styled, TextField, Typography} from "@mui/material";
import {FormEvent, ChangeEvent} from "react";

interface NewNewsItem {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const RootBox = styled(Box)(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

export const Form = styled('form')(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

export const NewNews = ({value, onChange, onSubmit}: NewNewsItem) => {
  return (
    <RootBox>
      <Typography variant="h2" mb={2} fontSize={24} fontWeight={700}>Add a news item</Typography>
      <Form onSubmit={onSubmit}>
        <TextField name="news" label="Enter value" value={value} onChange={onChange} fullWidth/>
        <Button variant="contained" size="small" type="submit">Save</Button>
      </Form>
    </RootBox>
  )
}