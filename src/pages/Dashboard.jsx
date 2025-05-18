import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    title: "Today's Medicines",
    desc: "2 medicines scheduled for today.",
    link: "/medicine-tracker",
    btn: "View Medicine Tracker",
  },
  {
    title: "Recent Symptom Checks",
    desc: "Last check: No major symptoms detected.",
    link: "/symptom-checker",
    btn: "Check Symptoms",
  },
  {
    title: "Nearby Clinics",
    desc: "3 clinics within 5km.",
    link: "/clinics-nearby",
    btn: "Find Clinics",
  },
  {
    title: "Profile & Settings",
    desc: "Update your preferences and profile.",
    link: "/settings",
    btn: "Go to Settings",
  }
];

const quotes = [
  "Take care of your body. It's the only place you have to live. – Jim Rohn",
  "Health is not valued till sickness comes. – Thomas Fuller",
  "A healthy outside starts from the inside. – Robert Urich",
  "The groundwork for all happiness is good health. – Leigh Hunt",
  "It is health that is real wealth and not pieces of gold and silver. – Mahatma Gandhi",
  "Your body deserves the best.",
  "Every step is progress. Keep moving for your health!",
  "Small healthy habits every day make a big difference.",
  "Self-care is how you take your power back.",
  "Motivation is what gets you started. Habit is what keeps you going."
];

// Blue-themed background image (simple and clean)
const bgImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

export default function Dashboard() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
  }, []);

  const handleNewQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === quote);
    setQuote(newQuote);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, md: 12 },
        pb: 6,
        '&:before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: `url(${bgImg}) center/cover no-repeat`,
          filter: 'none',
        },
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        <Typography
          variant="h3"
          fontWeight={800}
          color="primary"
          mb={2}
          textAlign="center"
          data-aos="fade-down"
        >
          Welcome to Your Dashboard
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          mb={6}
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Quick overview of your health activities and shortcuts.
        </Typography>

        {/* Motivational Quote Generator */}
        <Box
          sx={{
            mb: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data-aos="zoom-in"
        >
          <Card
            sx={{
              p: 3,
              maxWidth: 600,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 4,
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              fontStyle="italic"
            >
              "{quote}"
            </Typography>
          </Card>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleNewQuote}
            sx={{
              mt: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1,
            }}
          >
            New Motivation
          </Button>
        </Box>

        {/* Modern Features Grid */}
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={6} key={f.title}>
              <Card
                data-aos="fade-up"
                data-aos-delay={i * 100}
                sx={{
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {f.desc}
                  </Typography>
                  <Button
                    component={Link}
                    to={f.link}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                    }}
                  >
                    {f.btn}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Minimal Overview */}
        <Box mt={8}>
          <Typography variant="h5" fontWeight={700} mb={3} color="primary" data-aos="fade-right">
            Today's Overview
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4 }} data-aos="fade-up">
                <Typography variant="h4" fontWeight={800} color="primary">2</Typography>
                <Typography variant="body2" color="text.secondary">Medicines Scheduled</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4 }} data-aos="fade-up" data-aos-delay="100">
                <Typography variant="h4" fontWeight={800} color="primary">0</Typography>
                <Typography variant="body2" color="text.secondary">Symptoms Detected</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4 }} data-aos="fade-up" data-aos-delay="200">
                <Typography variant="h4" fontWeight={800} color="primary">3</Typography>
                <Typography variant="body2" color="text.secondary">Clinics Nearby</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
