import {useCallback, useEffect, useState, ChangeEvent, FormEvent} from 'react'
import {Box, styled, Typography} from "@mui/material";
import {useStorageService} from "./common/storageService.hook.ts";
import {News, NewsItem} from "./components/NewsItem.tsx";
import {NewNews} from "./components/NewNews.tsx";
import CssBaseline from "@mui/material/CssBaseline";

export const RootBox = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2),
  }
}));

export const ContentBox = styled(Box)(({theme}) => ({
  maxWidth: 1000,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  padding: theme.spacing(2, 1),
  border: '1px solid #CCCCCC',
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 2),
    marginTop: theme.spacing(2),
  }
}));

export const App = () => {
  const {storageData, setStorageData} = useStorageService();
  const [news, setNews] = useState<News[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    if (!news.length && storageData?.length) {
      setNews(storageData)
    }
  }, [news, storageData]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value), []);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (editId) {
      setNews((prev) => {
        const newData = prev.map((item) =>
          item.id === editId ? {id: item.id, message: inputValue} : item
        );
        setStorageData(newData);
        return newData;
      });
    } else {
      setNews((prev) => {
        const newData = [{id: new Date().toLocaleString(), message: inputValue}, ...prev];
        setStorageData(newData);
        return newData;
      });
    }
    setInputValue('')
    setEditId('')
  }, [inputValue, editId, setStorageData]);

  useEffect(() => {
    if (editId) {
      const editedMessage = news.find((item) => item.id === editId)?.message || '';
      setInputValue(editedMessage)
    }
  }, [news, editId])

  const onEdit = useCallback((id: string) => {
    setEditId(id);
  }, []);

  const onRemove = useCallback((id: string) => {
    setNews((prev) => {
      const newData = prev.filter((item) => item.id !== id);
      setStorageData(newData);
      return newData
    })
  }, []);

  return (
    <>
      <CssBaseline/>
      <RootBox>
        <ContentBox>
          <NewNews value={inputValue} onChange={onChange} onSubmit={onSubmit}/>
          <Box>
            <Typography variant="h2" mb={2} fontSize={24} fontWeight={700}>News list</Typography>
            {!!news.length && news.map((item) => (
              <NewsItem
                item={item}
                onEdit={onEdit}
                onRemove={onRemove}
                key={item.id}
              />
            ))}
          </Box>
        </ContentBox>
      </RootBox>
    </>
  )
}
