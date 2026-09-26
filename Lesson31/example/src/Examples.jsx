import {InlineCssExample} from './examples/InlineCssExample';
import {CssStylesheetExample} from './examples/CssStylesheetExample';
import {CssModulesExample} from './examples/CssModulesExample';
import {StyledComponentsExample} from './examples/StyledComponentsExample';
import {ScssExample} from './examples/ScssExample';
import {TailwindExample} from './examples/TailwindExample';

export const Examples = () => {
	return (
		<>
			<InlineCssExample />
			<CssStylesheetExample />
			<CssModulesExample />
			<StyledComponentsExample />
			<ScssExample />
			<TailwindExample />
		</>
	);
};
