import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';

const ToolTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: (props) => props.backgroundColor || '#FFFFFF',
    color: (props) => props.color || '#1C2023',
    maxWidth: (props) => props.maxWidth || '220px',
    fontSize: (props) => props.fontSize || theme.typography.pxToRem(12),
    border: (props) => props.border || '2px solid #A7AFB3',
    fontFamily: (props) => props.fontFamily || 'Open Sans',
    fontWeight: (props) => props.fontWeight || '600',
    textAlign: (props) => props.textAlign || 'left',
    lineHeight: (props) => props.lineHeight || '1.6',
    padding: (props) => props.padding || '10px 12px 10px 12px',
    borderRadius: (props) => props.borderRadius || '0px',
  },
  arrow: {
    color: (props) => props.arrowColor || '#FFFFFF',
    fontSize: (props) => props.arrowSize || theme.typography.pxToRem(20),
    '&::before': {
      border: (props) => props.arrowBorder || '2px solid #A7AFB3',
    },
  },
}))(MuiTooltip);

export default ToolTip;
