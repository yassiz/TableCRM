import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getAllOpportunities, createAndUpdateOpportunities, deleteOpportunities } from '../actions/opportunitiesActions';

import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';

// start of class
class Opportunities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getAllOpportunities());
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.opportunities
            ? <p>loading...</p>
            : <HotTable
                root="hot"
                ref="hot"
                settings={{
                  licenseKey: '',
                  data: this.props.opportunities,
                  dataSchema: {
                    id: null,
                    name: null,
                    description: null,
                    estimatedValue: null,
                    winProbability: null,
                    priority: null,
                    stage: null,
                    expectedCloseDate: null,
                    origin: null,
                    createdAt: null,
                    updatedAt: null
                  },
                  colHeaders: ['id', 'Opportunity Name', 'Description', 'Est Value ($)', 'Win Probability (%)', 'Priority', 'Stage', 'Expected Close Date', 'Origin', 'Created At', 'Updated At'],
                  columns: [
                    {data: 'id'},
                    {data: 'name'},
                    {data: 'description'},
                    {data: 'estimatedValue', type: 'numeric'},
                    {data: 'winProbability', type: 'numeric'},
                    {data: 'priority', type: 'dropdown', source: ['High', 'Medium', 'Low']},
                    {data: 'stage', type: 'dropdown', source: ['Open', 'Won', 'Lost', 'Abandoned']},
                    {data: 'expectedCloseDate', type: 'date'},
                    {data: 'origin', type: 'dropdown', source: ['Reference', 'Network', 'Other']},
                    {data: 'createdAt', type: 'date', readOnly: true},
                    {data: 'updatedAt', type: 'date', readOnly: true}
                  ],
                  colWidths: [10, 80, 120, 20, 22, 25, 25, 25],
                  columnSorting: true,
                  filters: true,
                  dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                  rowHeaders: true,
                  stretchH: 'all',
                  minSpareRows: 1,
                  contextMenu: ['remove_row', 'copy', 'cut'],
                  afterChange: (changes, source) => {
                    this.props.dispatch(createAndUpdateOpportunities(changes, source).bind(this));
                  },
                  beforeRemoveRow: (index, amount) => {
                    this.props.dispatch(deleteOpportunities(index, amount).bind(this));
                  }
                }}
              />}
        </div>
      </div>
    );
  }
} // end of class

const mapStateToProps = state => ({
  opportunities: state.opportunitiesReducer.opportunities
});

export default connect(mapStateToProps)(Opportunities);
