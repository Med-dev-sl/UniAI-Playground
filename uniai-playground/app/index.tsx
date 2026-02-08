import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { signIn as sbSignIn, signUp as sbSignUp } from "./lib/supabase";
import { useOnboarding } from "./context/OnboardingContext";

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserId } = useOnboarding();

  const handleSubmit = async () => {
    if (!email || !password) return Alert.alert("Error", "Please complete the form");
    setLoading(true);
    try {
      if (isLogin) {
        const { error, data } = await sbSignIn(email, password);
        if (error) throw error;
        if (data?.user?.id) {
          setUserId(data.user.id, email, fullName || email.split('@')[0]);
          Alert.alert("Welcome back! 🎓", "You've successfully logged in.");
          router.replace("/level" as any);
        }
      } else {
        if (!fullName.trim()) return Alert.alert("Error", "Please enter your full name");
        const { error, data } = await sbSignUp(email, password);
        if (error) throw error;
        if (data?.user?.id) {
          setUserId(data.user.id, email, fullName);
          Alert.alert("Account created! 🎉", "Welcome to UniAI Playground!");
          router.replace("/level" as any);
        }
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.orbs} />

      <View style={styles.container}>
        <View style={styles.logoPill}>
          <Text style={styles.logoSparkle}>✨</Text>
          <Text style={styles.logoText}>AI-Powered Learning</Text>
        </View>

        <Text style={styles.heading}>UniAI Playground</Text>
        <Text style={styles.sub}>{isLogin ? 'Welcome back, Student!' : 'Join thousands of learners'}</Text>

        <View style={styles.card}>
          {!isLogin && (
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput value={fullName} onChangeText={setFullName} placeholder="Enter your full name" style={styles.input} placeholderTextColor="#94a3b8" />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="student@university.edu" keyboardType="email-address" autoCapitalize="none" style={styles.input} placeholderTextColor="#94a3b8" />
          </View>

          <View style={styles.field}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Password</Text>
              {isLogin && (
                <TouchableOpacity onPress={() => Alert.alert('Forgot password', 'Use web flow to reset password')}>
                  <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry={!showPassword} style={styles.input} placeholderTextColor="#94a3b8" />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showBtn}>
              <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.cta, loading && styles.ctaDisabled]} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.ctaText}>{loading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create Account')}</Text>
          </TouchableOpacity>

          <View style={styles.footerText}>
            <Text style={styles.muted}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.toggle}>{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flexGrow: 1, backgroundColor: '#0f172a' },
  orbs: { height: 140 },
  container: { padding: 24, paddingTop: 48, alignItems: 'center' },
  logoPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(14,165,160,0.08)', borderWidth: 1, borderColor: 'rgba(14,165,160,0.12)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginBottom: 12 },
  logoSparkle: { fontSize: 16, color: '#06b6d4', marginRight: 6, fontFamily: 'centurygothic.ttf' },
  logoText: { color: '#06b6d4', fontWeight: '600', fontSize: 14, fontFamily: 'centurygothic_bold.ttf' },
  heading: { fontSize: 40, fontWeight: '800', color: '#fff', marginTop: 6, fontFamily: 'centurygothic_bold.ttf' },
  sub: { color: '#94a3b8', marginBottom: 18, fontSize: 16, fontFamily: 'centurygothic.ttf' },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#0b1220', borderRadius: 14, padding: 18, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, elevation: 6 },
  field: { marginBottom: 12 },
  label: { color: '#cbd5e1', marginBottom: 6, fontSize: 15, fontFamily: 'centurygothic.ttf' },
  input: { height: 52, backgroundColor: '#071028', borderRadius: 10, paddingHorizontal: 12, color: '#fff', fontSize: 16, borderWidth: 1, borderColor: '#122335', fontFamily: 'centurygothic.ttf' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  forgot: { color: '#06b6d4', fontSize: 14, fontFamily: 'centurygothic.ttf' },
  showBtn: { position: 'absolute', right: 14, top: 90 },
  showText: { color: '#94a3b8', fontSize: 14, fontFamily: 'centurygothic.ttf' },
  cta: { height: 52, backgroundColor: '#06b6d4', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  ctaDisabled: { opacity: 0.6 },
  ctaText: { color: '#00201f', fontWeight: '700', fontSize: 16, fontFamily: 'centurygothic_bold.ttf' },
  footerText: { marginTop: 12, alignItems: 'center' },
  muted: { color: '#94a3b8', fontSize: 13, textAlign: 'center', marginBottom: 8, fontFamily: 'centurygothic.ttf' },
  toggle: { color: '#06b6d4', fontWeight: '600', fontSize: 14, fontFamily: 'centurygothic_bold.ttf' },
});
