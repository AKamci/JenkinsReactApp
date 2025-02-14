import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { InputBase, Popper, Paper, List, ListItem, Typography, Divider, ClickAwayListener } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { getAllJobForSearch } from '../../infrastructure/store/slices/Job/GetAllJobForSearch-Slice';
import FolderIcon from '@mui/icons-material/Folder';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { addSelectedItem, removeSelectedItem } from '../../infrastructure/store/slices/File/SelectedSearchedItem-Slice';
import { executeSearchCommand } from '../../infrastructure/commands/SearchCommands';
import { toggleShortcutsModal } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 4,
  backgroundColor: alpha(theme.palette.common.white, 0.06),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.6),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create(['width', 'background-color']),
  '& .MuiInputBase-input': {
    fontSize: '0.95rem',
    padding: theme.spacing(1.2),
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.6),
      opacity: 1,
      letterSpacing: '0.5px',
    },
  },
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  width: '400px',
  zIndex: 1500,
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    maxHeight: '60vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.background.paper,
    },
    '&::-webkit-scrollbar-thumb': {
      background: alpha(theme.palette.primary.main, 0.2),
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: alpha(theme.palette.primary.main, 0.3),
    },
  },
}));

const StyledListItem = styled(ListItem)<{ isselected?: string; isClickable?: boolean }>(({ theme, isselected, isClickable = true }) => ({
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: isClickable ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
  },
  backgroundColor: isselected === 'true' ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
  cursor: isClickable ? 'pointer' : 'default',
  gap: theme.spacing(1),
  opacity: isClickable ? 1 : 0.6,
}));

const FolderHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

interface SearchProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchResult {
  type: 'folder' | 'job';
  name: string;
  folderName?: string;
  isSelected?: boolean;
  subJobs?: SearchResult[];
}

interface GroupedResults {
  folders: SearchResult[];
  jobs: { [key: string]: SearchResult[] };
}

const Search: React.FC<SearchProps> = ({ placeholder = "Projelerde ara...", onChange }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const allProjects = useAppSelector((state) => state.getAllJobForSearch.data);
  const selectedItems = useAppSelector((state) => state.getSearchedItems.selectedItems);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    dispatch(getAllJobForSearch());
  }, [dispatch]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (searchValue.toLowerCase() === 'kısayollar') {
      dispatch(toggleShortcutsModal());
      setSearchTerm('');
      return;
    }

    if (!executeSearchCommand(searchValue)) {
      setAnchorEl(event.currentTarget);
      setIsPopperOpen(true);
      if (onChange) onChange(event);
    }
  }, [onChange, dispatch]);

  const handleSearchClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (searchTerm) {
      setAnchorEl(event.currentTarget);
      setIsPopperOpen(true);
    }
  }, [searchTerm]);

  const handleClickAway = useCallback(() => {
    setIsPopperOpen(false);
  }, []);

  const getGroupedSearchResults = useCallback((): GroupedResults => {
    if (!searchTerm || !allProjects?.jobs) return { folders: [], jobs: {} };

    const results: GroupedResults = {
      folders: [],
      jobs: {}
    };
    const searchLower = searchTerm.toLowerCase();

    allProjects.jobs.forEach(folder => {
      if (folder.name.toLowerCase().includes(searchLower)) {
        results.folders.push({
          type: 'folder',
          name: folder.name,
          subJobs: folder.jobs?.map(job => ({
            type: 'job',
            name: job.name,
            folderName: folder.name,
            subJobs: job.jobs?.filter(subJob => subJob.color !== 'disabled').map(subJob => ({
              type: 'job',
              name: subJob.name,
              folderName: encodeURIComponent(`${folder.name}/${job.name}`)
            }))
          }))
        });
      }

      if (folder.jobs) {
        const matchingJobs = folder.jobs.filter(job => 
          job.name.toLowerCase().includes(searchLower) ||
          job.jobs?.some(subJob => subJob.name.toLowerCase().includes(searchLower) && subJob.color !== 'disabled')
        ).map(job => ({
          type: 'job' as const,
          name: job.name,
          folderName: folder.name,
          subJobs: job.jobs?.filter(subJob => 
            subJob.name.toLowerCase().includes(searchLower) && subJob.color !== 'disabled'
          ).map(subJob => ({
            type: 'job' as const,
            name: subJob.name,
            folderName: encodeURIComponent(`${folder.name}/${job.name}`)
          }))
        }));

        if (matchingJobs.length > 0) {
          results.jobs[folder.name] = matchingJobs;
        }
      }
    });

    return results;
  }, [searchTerm, allProjects]);

  const groupedResults = useMemo(() => getGroupedSearchResults(), [getGroupedSearchResults]);
  const hasResults = useMemo(() => 
    groupedResults.folders?.length > 0 || Object.keys(groupedResults.jobs || {}).length > 0,
    [groupedResults]
  );

  const handleItemClick = useCallback((item: SearchResult) => {
    if (item.type === 'job' && item.folderName) {
      const searchedItem = {
        folderName: item.folderName,
        repositoryName: item.name
      };

      const isSelected = selectedItems.some(
        selected => selected.folderName === searchedItem.folderName && 
                   selected.repositoryName === searchedItem.repositoryName
      );

      if (isSelected) {
        dispatch(removeSelectedItem(searchedItem));
      } else {
        dispatch(addSelectedItem(searchedItem));
      }
    }
  }, [dispatch, selectedItems]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <SearchWrapper onClick={handleSearchClick}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={placeholder}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
            value={searchTerm}
            inputRef={inputRef}
          />
        </SearchWrapper>

        <StyledPopper 
          open={Boolean(searchTerm && hasResults && isPopperOpen)} 
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          <Paper>
            <List>
              {groupedResults.folders?.length > 0 && (
                <>
                  <FolderHeader>
                    <FolderIcon fontSize="small" />
                    Klasörler
                  </FolderHeader>
                  {groupedResults.folders.map((item, index) => (
                    <React.Fragment key={`folder-${index}`}>
                      <StyledListItem>
                        <FolderIcon color="primary" fontSize="small" />
                        <Typography variant="body1">{item.name}</Typography>
                      </StyledListItem>
                      {item.subJobs?.map((subJob, subIndex) => (
                        <React.Fragment key={`${item.name}-subjob-${subIndex}`}>
                          <StyledListItem 
                            style={{ paddingLeft: '32px' }}
                            onClick={() => handleItemClick(subJob)}
                          >
                            <AccountTreeIcon fontSize="small" />
                            <Typography variant="body1">{subJob.name}</Typography>
                          </StyledListItem>
                          {subJob.subJobs?.map((nestedJob, nestedIndex) => (
                            <StyledListItem
                              key={`${subJob.name}-nestedjob-${nestedIndex}`}
                              style={{ paddingLeft: '48px' }}
                              isClickable={false}
                            >
                              <AccountTreeIcon fontSize="small" />
                              <Typography variant="body1">{nestedJob.name}</Typography>
                            </StyledListItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                  <Divider />
                </>
              )}

              {Object.entries(groupedResults.jobs).map(([folderName, jobs]) => (
                <React.Fragment key={folderName}>
                  <FolderHeader>
                    <FolderIcon fontSize="small" />
                    {folderName}
                  </FolderHeader>
                  {jobs.map((job: SearchResult, index: number) => {
                    const isSelected = selectedItems.some(
                      item => item.folderName === folderName && 
                             item.repositoryName === job.name
                    );
                    
                    return (
                      <React.Fragment key={`${folderName}-job-${index}`}>
                        <StyledListItem 
                          onClick={() => handleItemClick(job)}
                          isselected={isSelected.toString()}
                        >
                          <AccountTreeIcon 
                            color={isSelected ? "primary" : "inherit"} 
                            fontSize="small" 
                          />
                          <Typography 
                            variant="body1"
                            color={isSelected ? "primary" : "inherit"}
                          >
                            {job.name}
                          </Typography>
                        </StyledListItem>
                        {job.subJobs?.map((subJob, subIndex) => (
                          <StyledListItem
                            key={`${job.name}-subjob-${subIndex}`}
                            style={{ paddingLeft: '32px' }}
                            isClickable={false}
                          >
                            <AccountTreeIcon fontSize="small" />
                            <Typography variant="body1">
                              {subJob.name}
                            </Typography>
                          </StyledListItem>
                        ))}
                      </React.Fragment>
                    );
                  })}
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </StyledPopper>
      </div>
    </ClickAwayListener>
  );
};
export default Search;
