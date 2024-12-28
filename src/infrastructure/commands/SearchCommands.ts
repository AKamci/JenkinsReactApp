import store from '../store/store';
import { setSelectedColors } from '../store/slices/Search/ShowRedOnly-Slice';

interface ColorConfig {
    name: string;
    scoreCondition: (score: number) => boolean;
}

const colorConfigs: ColorConfig[] = [
    {
        name: 'red',
        scoreCondition: (score) => score >= 2
    },
    {
        name: 'yellow',
        scoreCondition: (score) => score === 1
    }
];

export interface ISearchCommand {
    command: string;
    execute: (value: string) => void;
}

export const searchCommands: ISearchCommand[] = [
    {
        command: "color",
        execute: (value: string) => {
            if (value.toLowerCase() === 'clear') {
                store.dispatch(setSelectedColors([]));
                return;
            }
            
            const requestedColors = value.toLowerCase().split(',').map(c => c.trim()).filter(Boolean);
            const validColors = requestedColors.filter(color => 
                colorConfigs.some(config => config.name === color)
            );
            
            store.dispatch(setSelectedColors(validColors));
        }
    }
];

export const executeSearchCommand = (searchText: string): boolean => {
    if (!searchText.trim()) {
        store.dispatch(setSelectedColors([]));
        return true;
    }

    const commandMatch = searchText.match(/^(\w+)=(.+)$/);
    
    if (!commandMatch) return false;
    
    const [, command, value] = commandMatch;
    const foundCommand = searchCommands.find(cmd => cmd.command === command);
    
    if (foundCommand) {
        foundCommand.execute(value);
        return true;
    }
    
    return false;
}

export const getScoreForColor = (color: string, score: number): boolean => {
    const colorConfig = colorConfigs.find(config => config.name === color);
    return colorConfig ? colorConfig.scoreCondition(score) : false;
}; 