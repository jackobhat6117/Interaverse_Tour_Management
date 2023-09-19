import { HomeOutlined, ShoppingCartOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";

export default function NavLinks() {
  return (
    <div >
      <Tabs variant="fullWidth" value={0} className="font-bold" 
        TabIndicatorProps={{sx: {height: '4px'}}}>
        <Tab label='Home' icon={<HomeOutlined />} iconPosition="start" />
        <Tab label='Order' icon={<ShoppingCartOutlined />} iconPosition="start" />
        <Tab label='Support' icon={<SupportAgentOutlined />} iconPosition="start" />
      </Tabs>
    </div>
  )
}
