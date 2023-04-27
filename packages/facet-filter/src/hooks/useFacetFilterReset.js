import { useDispatch } from 'react-redux';
import {clearFacetSection} from '../store/actions/Actions';

const useFacetFilterReset = () =>{
    const dispatch = useDispatch();

    const resetFacetFilter = (facetConfig) =>{
        dispatch(clearFacetSection(facetConfig));
    }

    return {resetFacetFilter:resetFacetFilter}

}

export default useFacetFilterReset;