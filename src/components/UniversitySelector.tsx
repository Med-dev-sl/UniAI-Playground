import { motion } from 'framer-motion';
import { School, Building2 } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { University, universities } from '@/data/courses';

interface UniversitySelectorProps {
    selectedUniversity?: string | null;
    onSelectUniversity: (universityId: string) => void;
}

export function UniversitySelector({ selectedUniversity, onSelectUniversity }: UniversitySelectorProps) {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
                    Choose Your University
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Select your institution to access specialized AI assistants trained on your curriculum
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-center">
                {universities.map((uni, index) => (
                    <GlowCard
                        key={uni.id}
                        onClick={() => onSelectUniversity(uni.id)}
                        selected={selectedUniversity === uni.id}
                        delay={index * 0.1}
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${uni.id === 'njala' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-indigo-500'} p-0.5`}>
                                <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
                                    <span className="text-3xl">{uni.icon}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                                    {uni.name}
                                </h3>
                                <p className="text-sm text-electric font-medium mb-2">
                                    {uni.shortName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {uni.description}
                                </p>
                            </div>

                            {selectedUniversity === uni.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-electric flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </GlowCard>
                ))}
            </div>
        </div>
    );
}
