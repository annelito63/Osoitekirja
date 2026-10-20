import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Places: undefined;
  Map: { address: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;