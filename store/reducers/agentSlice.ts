import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgentType } from '@/types/agent';

interface AgentState {
  items: AgentType[];
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  items: [],
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    fetchAgents: (state) => {
      state.loading = true;
    },
    fetchAgentsSuccess: (state, action: PayloadAction<AgentType[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAgentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAgent: (state, action: PayloadAction<Omit<AgentType, 'id'>>) => {
      state.loading = true;
    },
    addAgentSuccess: (state, action: PayloadAction<AgentType>) => {
      state.items.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addAgentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAgents,
  fetchAgentsSuccess,
  fetchAgentsFailure,
  addAgent,
  addAgentSuccess,
  addAgentFailure,
} = agentSlice.actions;

export default agentSlice.reducer;
