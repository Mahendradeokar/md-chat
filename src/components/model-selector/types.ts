export interface Provider {
  id: string;
  name: string;
  description: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
}

export interface ModelValue {
  id: string;
  name: string;
}

export interface ModelSelectorProps {
  selectedModel?: ModelValue;
  onModelSelect: (arg: ModelValue) => void;
  className?: string;
}

export interface ModelStatus {
  status: "error" | "warning" | "success";
  text: string;
  className: string;
}

export type ApiKeyMode = "ADD" | "EDIT";

export interface ApiKeyCommonProps {
  mode: ApiKeyMode;
  onCancel: () => void;
}

export interface ModelListProps {
  selectedModel?: ModelValue;
  onModelSelect: (arg: ModelValue) => void;
}

export interface ProviderManagementProps {
  onEditProvider: (providerId: string) => void;
  onDeleteProvider: (providerId: string) => void;
  onClose: () => void;
}

export interface ApiKeyEditProps {
  providerId: string;
  apiKey: string;
  showApiKey: boolean;
  onApiKeyChange: (key: string) => void;
  onShowApiKeyToggle: () => void;
  onUpdate: () => void;
  onCancel: () => void;
  providers: Provider[];
}
