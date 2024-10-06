import {Box, Divider as MUIDivider, IconButton, styled, Tooltip, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {memo} from "react";

export interface News {
  id: string;
  message: string;
}

interface NewsItemProps {
  item: News;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export const RootBox = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  border: '1px solid #CCCCCC',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export const Divider = styled(MUIDivider)(({theme}) => ({
  display: 'block',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
}));

export const NewsItem = memo(({item, onEdit, onRemove}: NewsItemProps) => {
  return (
    <RootBox flexDirection={{ xs: 'column', md: 'row'}}>
      <Typography variant="body1" sx={{
        wordBreak: "break-word",
        overflowWrap: "break-word",
        textAlign: { xs: 'center', md: 'left'}
      }}>
        {item.message}
      </Typography>
      <Divider variant="fullWidth" />
      <Box display="flex" gap={1}>
        <Tooltip title="Edit news">
          <IconButton size="small" onClick={() => onEdit(item.id)}>
            <Edit fontSize='small'/>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete news">
          <IconButton size="small" onClick={() => onRemove(item.id)}>
            <Delete fontSize='small'/>
          </IconButton>
        </Tooltip>
      </Box>
    </RootBox>
  )
})