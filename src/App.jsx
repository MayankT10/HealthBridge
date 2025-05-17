import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fade,
  Stack,
  useScrollTrigger,
  Slide,
  Card,
  CardContent
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ParticlesBG from './components/ParticlesBG';
import MedicationIcon from '@mui/icons-material/Medication';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaceIcon from '@mui/icons-material/Place';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import NewspaperIcon from '@mui/icons-material/Newspaper';

// const NAV_LINKS = [
//   { label: 'Home', to: '#hero' },
//   { label: 'About', to: '#about' },
//   { label: 'Features', to: '#features' },
//   { label: 'Testimonials', to: '#testimonials' },
//   { label: 'Contact', to: '#contact' },
// ];

const NAV_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Medicine Tracker', to: '/medicine-tracker' },
  { label: 'Symptom Checker', to: '/symptom-checker' },
  { label: 'Clinics Nearby', to: '/clinics-nearby' },
  { label: 'Settings', to: '/settings' },
];

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Animated AppBar on scroll
function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

// Live Health News Ticker (demo)
function NewsTicker() {
  const [index, setIndex] = React.useState(0);
  const news = [
    "🌍 WHO: Global vaccination rates reach new high.",
    "💡 New AI tool helps diagnose rare diseases.",
    "🤝 HealthBridge partners with local clinics for free checkups.",
    "🩺 Telemedicine access expanded in rural areas.",
    "🌱 Mental health awareness week starts today!"
  ];
  React.useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % news.length), 4000);
    return () => clearInterval(timer);
  }, [news.length]);
  return (
    <Box sx={{
      bgcolor: "rgba(255,255,255,0.7)",
      borderRadius: 2,
      px: 2,
      py: 0.5,
      boxShadow: 2,
      display: "flex",
      alignItems: "center",
      gap: 1,
      mb: 2,
      maxWidth: 500,
      mx: "auto"
    }}>
      <NewspaperIcon color="primary" />
      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1976d2" }}>
        {news[index]}
      </Typography>
    </Box>
  );
}

function FeatureCard({ icon, title, desc, delay, onClick, highlight }) {
  return (
    <Fade in timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        onClick={onClick}
        sx={{
          minWidth: 220,
          boxShadow: highlight ? "0 0 24px 4px #43e97b88, 0 2px 8px #1976d2" : 6,
          borderRadius: 4,
          transition: 'transform 0.4s, box-shadow 0.4s',
          backdropFilter: "blur(6px)",
          background: highlight
            ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            : "rgba(255,255,255,0.85)",
          color: highlight ? "#fff" : "#1976d2",
          '&:hover': {
            transform: 'scale(1.09) rotate(-2deg)',
            boxShadow: highlight
              ? "0 0 32px 8px #43e97b, 0 4px 16px #1976d2"
              : 12,
            cursor: 'pointer',
            background: highlight
              ? "linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)"
              : "rgba(255,255,255,0.95)"
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>{title}</Typography>
          </Box>
          <Typography variant="body2" color={highlight ? "#fff" : "text.secondary"}>{desc}</Typography>
        </CardContent>
      </Card>
    </Fade>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 8 }}>
      <Fade in timeout={1200}>
        <Box>
          <Typography variant="h2" align="center" gutterBottom fontWeight={900} sx={{
            color: "#fff",
            textShadow: "2px 2px 16px #1976d2, 0 0 24px #43e97b"
          }}>
            Welcome to HealthBridge!
          </Typography>
          <Typography variant="h6" align="center" color="#e3f2fd" gutterBottom sx={{
            textShadow: "1px 1px 8px #1976d2"
          }}>
            Social Good for Healthcare: Track medicines, check symptoms, find clinics, and support community health.
          </Typography>
        </Box>
      </Fade>
      <NewsTicker />
      <Grid container spacing={4} sx={{ mt: 4, justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<MedicationIcon color="primary" sx={{ fontSize: 44 }} />}
            title="Medicine Tracker"
            desc="Never miss a dose. Track your medicines easily."
            delay={200}
            onClick={() => navigate('/medicine-tracker')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<SearchIcon color="primary" sx={{ fontSize: 44 }} />}
            title="Symptom Checker"
            desc="Check your symptoms and get guidance."
            delay={400}
            onClick={() => navigate('/symptom-checker')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<PlaceIcon color="primary" sx={{ fontSize: 44 }} />}
            title="Clinics Nearby"
            desc="Find clinics and healthcare providers near you."
            delay={600}
            onClick={() => navigate('/clinics-nearby')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<SettingsIcon color="primary" sx={{ fontSize: 44 }} />}
            title="Settings"
            desc="Manage your preferences and account."
            delay={800}
            onClick={() => navigate('/settings')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureCard
            icon={<VolunteerActivismIcon sx={{ fontSize: 44, color: "#43e97b" }} />}
            title="Donate"
            desc="Support health for all. Every contribution counts!"
            delay={1000}
            onClick={() => window.open('https://www.who.int/emergencies/donate', '_blank')}
            highlight
          />
        </Grid>
      </Grid>
    </Container>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <Fade in={visible}>
      <Box
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 1300, bgcolor: '#1976d2', color: '#fff',
          borderRadius: '50%', p: 1.5, boxShadow: 4, cursor: 'pointer', '&:hover': { bgcolor: '#1565c0' }
        }}
      >
        <ArrowUpwardIcon />
      </Box>
    </Fade>
  );
}

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ threshold: 80 });
  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 6 : 0}
        sx={{
          bgcolor: trigger ? 'rgba(25,118,210,0.98)' : 'transparent',
          boxShadow: trigger ? 6 : 0,
          transition: 'background 0.3s, box-shadow 0.3s',
          backdropFilter: trigger ? 'blur(8px)' : 'none'
        }}
      >
        <Toolbar>
          <LocalHospitalIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 2, fontFamily: 'Montserrat' }}>
            HealthBridge
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {NAV_LINKS.map(link => (
              <Button
                key={link.label}
                href={link.to}
                sx={{ color: '#fff', fontWeight: 700, fontFamily: 'Montserrat', '&:hover': { color: '#43e97b' } }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="success"
              sx={{ fontWeight: 700, ml: 2, boxShadow: "0 0 8px #43e97b", background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)" }}
              href="https://www.who.int/emergencies/donate"
              target="_blank"
            >
              Donate
            </Button>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220, mt: 4 }}>
          <List>
            {NAV_LINKS.map(link => (
              <ListItem button key={link.label} component="a" href={link.to} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            <ListItem button component="a" href="https://www.who.int/emergencies/donate" target="_blank">
              <ListItemText primary="Donate" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

function HeroSection() {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(120deg, #1976d2cc 60%, #43e97bcc 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        pt: { xs: 10, md: 0 }
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={1200}>
          <Box>
            <Typography variant="h2" fontWeight={900} sx={{ fontFamily: 'Montserrat', textShadow: "2px 2px 16px #1976d2, 0 0 24px #43e97b" }}>
              Social Good for Healthcare
            </Typography>
            <Typography variant="h5" sx={{ mt: 3, mb: 5, fontFamily: 'Open Sans', color: '#e3f2fd', textShadow: "1px 1px 8px #1976d2" }}>
              Accessible, high-tech health tools for everyone. Track medicines, check symptoms, find clinics, and support community health.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="success"
              sx={{
                fontWeight: 700,
                px: 5,
                py: 1.5,
                fontSize: 20,
                boxShadow: "0 0 16px #43e97b",
                background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)"
              }}
              href="#features"
            >
              Explore Features
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

function AboutSection() {
  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" fontWeight={900} sx={{ mb: 2, color: "#1976d2", fontFamily: 'Montserrat' }}>
          About HealthBridge
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
          HealthBridge is a social good platform empowering communities with accessible, high-tech healthcare tools. Our mission is to bridge the gap in healthcare access using technology, compassion, and innovation.
        </Typography>
      </Container>
    </Box>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <MedicationIcon color="primary" sx={{ fontSize: 44 }} />,
      title: "Medicine Tracker",
      desc: "Never miss a dose. Track your medicines easily.",
    },
    {
      icon: <SearchIcon color="primary" sx={{ fontSize: 44 }} />,
      title: "Symptom Checker",
      desc: "Check your symptoms and get guidance.",
    },
    {
      icon: <PlaceIcon color="primary" sx={{ fontSize: 44 }} />,
      title: "Clinics Nearby",
      desc: "Find clinics and healthcare providers near you.",
    },
    {
      icon: <SettingsIcon color="primary" sx={{ fontSize: 44 }} />,
      title: "Settings",
      desc: "Manage your preferences and account.",
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 44, color: "#43e97b" }} />,
      title: "Donate",
      desc: "Support health for all. Every contribution counts!",
      highlight: true,
    },
  ];
  return (
    <Box id="features" sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(120deg, #e3f2fd 60%, #fff 100%)" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" fontWeight={900} sx={{ mb: 6, color: "#1976d2", fontFamily: 'Montserrat' }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={f.title}>
              <Fade in timeout={800} style={{ transitionDelay: `${i * 200}ms` }}>
                <Card
                  sx={{
                    minWidth: 220,
                    boxShadow: f.highlight ? "0 0 24px 4px #43e97b88, 0 2px 8px #1976d2" : 6,
                    borderRadius: 4,
                    transition: 'transform 0.4s, box-shadow 0.4s',
                    backdropFilter: "blur(6px)",
                    background: f.highlight
                      ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                      : "rgba(255,255,255,0.85)",
                    color: f.highlight ? "#fff" : "#1976d2",
                    '&:hover': {
                      transform: 'scale(1.09) rotate(-2deg)',
                      boxShadow: f.highlight
                        ? "0 0 32px 8px #43e97b, 0 4px 16px #1976d2"
                        : 12,
                      cursor: 'pointer',
                      background: f.highlight
                        ? "linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)"
                        : "rgba(255,255,255,0.95)"
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {f.icon}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>{f.title}</Typography>
                    </Box>
                    <Typography variant="body2" color={f.highlight ? "#fff" : "text.secondary"}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aarav S.",
      text: "HealthBridge helped my family track medicines and find clinics nearby. The interface is beautiful and easy to use!",
    },
    {
      name: "Priya K.",
      text: "The symptom checker is a lifesaver. I love the social good mission and the donate feature!",
    },
    {
      name: "Dr. Mehta",
      text: "As a doctor, I recommend HealthBridge for its accessibility and focus on community health.",
    },
  ];
  return (
    <Box id="testimonials" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" fontWeight={900} sx={{ mb: 6, color: "#1976d2", fontFamily: 'Montserrat' }}>
          Testimonials
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t, i) => (
            <Grid item xs={12} sm={6} md={4} key={t.name}>
              <Fade in timeout={800} style={{ transitionDelay: `${i * 200}ms` }}>
                <Card sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  p: 2,
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: "#1976d2" }}>
                    "{t.text}"
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#43e97b" }}>
                    {t.name}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function ContactSection() {
  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(120deg, #e3f2fd 60%, #fff 100%)" }}>
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" fontWeight={900} sx={{ mb: 4, color: "#1976d2", fontFamily: 'Montserrat' }}>
          Contact Us
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input type="text" placeholder="Your Name" required style={{ padding: 12, borderRadius: 8, border: '1px solid #1976d2', fontSize: 16 }} />
          <input type="email" placeholder="Your Email" required style={{ padding: 12, borderRadius: 8, border: '1px solid #1976d2', fontSize: 16 }} />
          <textarea placeholder="Your Message" required rows={4} style={{ padding: 12, borderRadius: 8, border: '1px solid #1976d2', fontSize: 16 }} />
          <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 700, mt: 2 }}>
            Send Message
          </Button>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <IconButton color="primary" href="https://facebook.com" target="_blank"><FacebookIcon /></IconButton>
          <IconButton color="primary" href="https://twitter.com" target="_blank"><TwitterIcon /></IconButton>
          <IconButton color="primary" href="https://instagram.com" target="_blank"><InstagramIcon /></IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(25, 118, 210, 0.95)',
        color: 'white',
        py: 2,
        px: 2,
        textAlign: 'center',
        letterSpacing: 1.5,
        zIndex: 10
      }}
    >
      &copy; {new Date().getFullYear()} HealthBridge. Social Good for Healthcare.
    </Box>
  );
}

export default function App() {
  return (
    <Box sx={{ background: "#f4f8fb" }}>
      <ParticlesBG />
      <Navbar />
      <Box sx={{ pt: { xs: 8, md: 10 } }}>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <ScrollToTopButton />
      </Box>
    </Box>
  );
}