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

export interface ConfiguredProvider {
  id: string;
  name: string;
  icon: string;
  hasKey: boolean;
}

export interface ModelSelectorProps {
  selectedModel?: string;
  onModelSelect: (model: string) => void;
  className?: string;
}

export interface ModelStatus {
  status: "error" | "warning" | "success";
  text: string;
  className: string;
}

export interface ApiKeyFormProps {
  selectedProvider: string;
  apiKey: string;
  showApiKey: boolean;
  onProviderSelect: (providerId: string) => void;
  onApiKeyChange: (key: string) => void;
  onShowApiKeyToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  providers: Provider[];
}

export interface ModelListProps {
  models: Record<string, Model[]>;
  selectedModel?: string;
  onModelSelect: (modelId: string) => void;
  providers: Provider[];
}

export interface ProviderManagementProps {
  configuredProviders: ConfiguredProvider[];
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
