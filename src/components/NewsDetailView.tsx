import React from 'react';
import { NewsItem, Comment } from '../types';
import SmartHydroponicsShowcase from './SmartHydroponicsShowcase';
import LuminetShowcase from './LuminetShowcase';
import HycosmartsShowcase from './HycosmartsShowcase';
import SimonaShowcase from './SimonaShowcase';
import FlocifyShowcase from './FlocifyShowcase';
import RecruitmentNewsShowcase from './RecruitmentNewsShowcase';
import StandardNewsArticleView from './StandardNewsArticleView';

interface NewsDetailViewProps {
  item: NewsItem;
  comments: Comment[];
  onBack: () => void;
  onAddComment: (name: string, email: string, content: string) => void;
  onOpenJoinModal?: () => void;
}

export default function NewsDetailView({ item, comments, onBack, onAddComment, onOpenJoinModal }: NewsDetailViewProps) {
  // 1. Lowongan Magang / Recruitment news ➔ dedicated RecruitmentNewsShowcase!
  if (
    item.id === 'open-recruitment-magang-2026' || 
    item.category.toLowerCase().includes('magang') || 
    item.category.toLowerCase().includes('recruitment') ||
    item.title.toLowerCase().includes('magang')
  ) {
    return (
      <RecruitmentNewsShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
        onOpenJoinModal={onOpenJoinModal}
      />
    );
  }

  // 2. FLOCIFY article ➔ dedicated FLOCIFY showcase!
  if (item.id === 'flocify-biofloc-ai' || item.id === 'flocify') {
    return (
      <FlocifyShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // 3. LUMINET article ➔ dedicated LUMINET showcase!
  if (item.id === 'luminet-smart-lighting' || item.id === 'luminet' || item.id === 'luminet-btp') {
    return (
      <LuminetShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // 4. SIMONA article ➔ dedicated SIMONA showcase!
  if (item.id === 'simona-aquaponics' || item.id === 'simona') {
    return (
      <SimonaShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // 5. HYCOSMARTS article ➔ dedicated HYCOSMARTS showcase!
  if (item.id === 'hycosmarts-container' || item.id === 'hycosmarts') {
    return (
      <HycosmartsShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // 6. Smart Hydroponics article ➔ dedicated SmartHydroponics showcase!
  if (item.id === 'smart-hydroponics') {
    return (
      <SmartHydroponicsShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // 7. For all standard news articles (Panen Perdana, Workshop, Kunjungan Industri, Custom News), render StandardNewsArticleView!
  return (
    <StandardNewsArticleView 
      item={item} 
      comments={comments} 
      onBack={onBack} 
      onAddComment={onAddComment} 
    />
  );
}
