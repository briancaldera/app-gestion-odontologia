import {StyledEngineProvider} from '@mui/joy/styles';

const StylesDecorator = storyFn => (
    <StyledEngineProvider injectFirst>
        {storyFn()}
    </StyledEngineProvider>
)

export default StylesDecorator
