"""create user visited countries model

Revision ID: c372340cb301
Revises: f3db79ca0b90
Create Date: 2025-01-05 19:21:07.028019

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c372340cb301'
down_revision = 'f3db79ca0b90'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('visited_countries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('country_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['country_id'], ['countries.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('visited_countries')
    # ### end Alembic commands ###
