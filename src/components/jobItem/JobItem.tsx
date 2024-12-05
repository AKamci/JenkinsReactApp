import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const JobItem: React.FC<{ job: JobDto }> = ({ job }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box style={{ margin: '10px' }}>
      <Card
        variant="outlined"
        style={{
          borderColor: job.color,
          borderWidth: '2px',
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" style={{ color: 'black' }}>
            {job.name}
          </Typography>
          <IconButton onClick={handleExpandClick}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CardContent>
        {expanded && (
          <Box style={{ padding: '10px' }}>
            {[...Array(5)].map((_, index) => (
              <Card key={index} variant="outlined" style={{ marginBottom: '5px' }}>
                <CardContent>
                  <Typography variant="body2" style={{ color: 'grey' }}>
                    Branch ...☀️ {index + 1}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default JobItem;