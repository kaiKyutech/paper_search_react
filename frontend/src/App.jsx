import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import SearchOptions from './components/SearchOptions.jsx'
import PaperList from './components/PaperList.jsx'
import ChatPanel from './components/ChatPanel.jsx'

import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function App() {
  const [options, setOptions] = useState({})
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSearch = async ({ query, mode }) => {
    setLoading(true)
    setSelectedPaper(null)
    try {
      const params = new URLSearchParams({
        query,
        mode,
        year_from: options.yearFrom || 2020,
        year_to: options.yearTo || 2025,
        limit: options.numPapers || 10,
      })
      const res = await fetch(`/api/search?${params}`)
      const data = await res.json()
      setPapers(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Paper Search Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: 240 } }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem>Search</ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            論文検索
          </Typography>
          <SearchBar onSearch={handleSearch} />
          <SearchOptions onChange={setOptions} />
          {loading && <Typography>検索中...</Typography>}
          <PaperList papers={papers} onSelect={setSelectedPaper} />
          <ChatPanel paper={selectedPaper} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
